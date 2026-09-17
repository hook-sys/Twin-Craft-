-- =============================================================================
-- Aladeen — 0001 foundation
--
-- Identity, tenancy and the audit trail. Every later module hangs off
-- companies.id, never off auth.users.id, so one person can belong to several
-- businesses and a business can outlive the account that created it.
--
-- Rules encoded here:
--   * a user's role is not self-writable
--   * a company's plan is not self-writable
--   * audit_logs is append-only for everybody
--   * nothing is hard deleted; rows carry deleted_at
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- enumerations
create type public.app_role as enum ('SUPER_ADMIN', 'USER');
create type public.company_role as enum ('OWNER', 'ADMIN', 'STAFF');
create type public.company_status as enum ('active', 'suspended');
create type public.plan_tier as enum ('free', 'pro');

-- --------------------------------------------------------------------- tables
create table public.users (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  phone       text,
  avatar_url  text,
  role        public.app_role not null default 'USER',
  locale      text not null default 'bn',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

comment on column public.users.role is
  'Platform role. Writable only by a super admin or the service role — see protect_user_role().';

create table public.companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (length(btrim(name)) between 2 and 120),
  slug        text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$'),
  phone       text,
  address     text,
  logo_url    text,
  plan        public.plan_tier not null default 'free',
  status      public.company_status not null default 'active',
  created_by  uuid references public.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

comment on column public.companies.plan is
  'Billing tier. Writable only by a super admin or the service role — see protect_company_plan().';

create table public.company_members (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references public.companies (id) on delete cascade,
  user_id     uuid not null references public.users (id) on delete cascade,
  role        public.company_role not null default 'STAFF',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (company_id, user_id)
);

create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid references public.companies (id) on delete set null,
  actor_id    uuid references public.users (id) on delete set null,
  action      text not null,
  entity      text not null,
  entity_id   text,
  detail      jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

-- -------------------------------------------------------------------- indexes
create index users_role_idx            on public.users (role) where deleted_at is null;
create index companies_created_by_idx  on public.companies (created_by);
create index companies_status_idx      on public.companies (status) where deleted_at is null;
create index company_members_user_idx  on public.company_members (user_id);
create index company_members_co_idx    on public.company_members (company_id, role);
create index audit_logs_company_idx    on public.audit_logs (company_id, created_at desc);
create index audit_logs_actor_idx      on public.audit_logs (actor_id, created_at desc);

-- ------------------------------------------------------------------ functions
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Membership lookups run inside the policies of the very tables they read, so
-- they are SECURITY DEFINER to break the recursion.
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.users
    where id = (select auth.uid()) and role = 'SUPER_ADMIN' and deleted_at is null
  );
$$;

create or replace function public.is_company_member(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.company_members
    where company_id = target and user_id = (select auth.uid())
  );
$$;

create or replace function public.is_company_admin(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.company_members
    where company_id = target
      and user_id = (select auth.uid())
      and role in ('OWNER', 'ADMIN')
  );
$$;

-- A new auth user gets a profile row. The first person to sign up owns the
-- platform; everybody after them is an ordinary user.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  first_user boolean;
begin
  select not exists (select 1 from public.users) into first_user;

  insert into public.users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    nullif(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''),
    case when first_user then 'SUPER_ADMIN'::public.app_role else 'USER'::public.app_role end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.protect_user_role()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.role is distinct from old.role
     and auth.role() is distinct from 'service_role'
     and not public.is_super_admin() then
    raise exception 'role is not self-writable';
  end if;
  return new;
end;
$$;

create or replace function public.protect_company_plan()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (new.plan is distinct from old.plan or new.status is distinct from old.status)
     and auth.role() is distinct from 'service_role'
     and not public.is_super_admin() then
    raise exception 'plan and status are set by billing, not by the company';
  end if;
  return new;
end;
$$;

-- ------------------------------------------------------------------- triggers
create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function public.set_updated_at();

create trigger company_members_set_updated_at
  before update on public.company_members
  for each row execute function public.set_updated_at();

create trigger users_protect_role
  before update on public.users
  for each row execute function public.protect_user_role();

create trigger companies_protect_plan
  before update on public.companies
  for each row execute function public.protect_company_plan();

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ------------------------------------------------------------------------ RLS
alter table public.users            enable row level security;
alter table public.companies        enable row level security;
alter table public.company_members  enable row level security;
alter table public.audit_logs       enable row level security;

-- users: yourself, anyone you share a company with, or everyone if super admin.
create policy "users read self or colleagues" on public.users
  for select using (
    id = (select auth.uid())
    or public.is_super_admin()
    or exists (
      select 1
      from public.company_members mine
      join public.company_members theirs on theirs.company_id = mine.company_id
      where mine.user_id = (select auth.uid()) and theirs.user_id = public.users.id
    )
  );

create policy "users update self" on public.users
  for update using (id = (select auth.uid()) or public.is_super_admin())
  with check (id = (select auth.uid()) or public.is_super_admin());

-- companies: members read, admins write, anyone signed in may create their own.
create policy "companies read by members" on public.companies
  for select using (public.is_company_member(id) or public.is_super_admin());

create policy "companies created by signed in users" on public.companies
  for insert with check (created_by = (select auth.uid()));

create policy "companies updated by admins" on public.companies
  for update using (public.is_company_admin(id) or public.is_super_admin())
  with check (public.is_company_admin(id) or public.is_super_admin());

-- company_members: visible to the company, written by its admins.
create policy "members read by company" on public.company_members
  for select using (public.is_company_member(company_id) or public.is_super_admin());

create policy "members added by admins" on public.company_members
  for insert with check (
    public.is_company_admin(company_id)
    or public.is_super_admin()
    -- the founder's own OWNER row, written the moment the company appears
    or (
      user_id = (select auth.uid())
      and role = 'OWNER'
      and exists (
        select 1 from public.companies
        where id = company_id and created_by = (select auth.uid())
      )
      and not exists (
        select 1 from public.company_members existing
        where existing.company_id = public.company_members.company_id
      )
    )
  );

create policy "members updated by admins" on public.company_members
  for update using (public.is_company_admin(company_id) or public.is_super_admin())
  with check (public.is_company_admin(company_id) or public.is_super_admin());

create policy "members removed by admins" on public.company_members
  for delete using (public.is_company_admin(company_id) or public.is_super_admin());

-- audit_logs: append only. No UPDATE or DELETE policy exists, for anyone.
create policy "audit read by company" on public.audit_logs
  for select using (
    public.is_super_admin()
    or (company_id is not null and public.is_company_member(company_id))
  );

create policy "audit append" on public.audit_logs
  for insert with check (
    actor_id = (select auth.uid())
    and (company_id is null or public.is_company_member(company_id))
  );
