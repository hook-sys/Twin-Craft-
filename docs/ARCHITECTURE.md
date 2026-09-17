# Aladeen — architecture rules

These rules are the contract for every file in `src/`. A change that breaks one
of them is a bug, however convenient it looks.

## Layers

```
app/route      composes UI, calls services, never imports a database client
modules/*/service.ts     validates input, checks permission, orchestrates
modules/*/repository.ts  the ONLY place Supabase is called
Postgres + RLS           defence in depth, never the only defence
```

1. **TypeScript strict mode.** No `any` outside a typed boundary.
2. **No business logic in UI components.** A component renders what it is given.
3. **Database access stays in `modules/*/repository.ts`.** Repositories carry
   `import "server-only"` so a client import fails the build.
4. **All external input is validated** with zod, at the service boundary — not
   in the form, which is a convenience, not a guarantee.
5. **Authorization is checked server-side**, in the service, through
   `lib/permissions`. A hidden button is not a permission check.
6. **Company ownership is checked server-side.** Every business query filters by
   `company_id`, and RLS enforces it a second time.
7. **Templates are versioned.** A published `template_version` is immutable.
8. **User websites are independent of master templates.** Installing deep-copies
   the version's snapshot; nothing reads the master afterwards.
9. **Draft and published website states are separate rows**, never a flag on one.
10. **Destructive deletion is avoided** where history matters: rows carry
    `deleted_at` and repositories filter it.
11. **Reuse `components/ui`** instead of re-styling a button.
12. **Modules own their boundary.** Cross-module access goes through the other
    module's *service*, never its repository or its tables.
13. **Migrations are version controlled** in `supabase/migrations/`, applied in
    order, never edited after they run.
14. **No secrets in Git.** Only publishable keys may appear in config.
15. **Important actions are logged** to `audit_logs`, which is append-only.
16. **APIs and actions return one shape** — `ActionResult` from `lib/errors`.
17. **Large lists are paginated** at the repository, with `range()`.
18. **File uploads are validated** server-side: type, size, dimensions.
19. **No feature bypasses the architecture for convenience.**

## Where things live

| Path | Holds |
|---|---|
| `src/app/(marketing)` | public pages |
| `src/app/(auth)` | sign in, sign up |
| `src/app/(dashboard)` | the company workspace |
| `src/app/(admin)` | platform administration (super admin only) |
| `src/modules/<domain>` | schema, repository, service for one domain |
| `src/components/ui` | design system primitives |
| `src/components/app` | signed-in chrome |
| `src/lib/auth` | session resolution and route guards |
| `src/lib/permissions` | the permission matrix and `can()` |
| `src/lib/errors` | `AppError`, `ActionResult`, readable messages |
| `src/lib/validations` | shared zod pieces |
| `supabase/migrations` | the schema, in order |
| `legacy/` | the v1 app, excluded from build and lint |

## Roles

| Platform role | Meaning |
|---|---|
| `SUPER_ADMIN` | runs Aladeen itself; passes every permission check |
| `USER` | an ordinary account |

| Company role | Can |
|---|---|
| `OWNER` | everything in the company, including roles and billing |
| `ADMIN` | everything except changing roles and billing |
| `STAFF` | day-to-day work: CRM, inventory, website content |

`users.role` and `companies.plan` are protected by database triggers — neither
can be changed by the account that owns the row.
