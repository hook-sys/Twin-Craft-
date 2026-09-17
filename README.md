# Aladeen

Company website builder, CRM, inventory, accounts and HR for small businesses.

- **Website builder** (primary product): pick a template, customise it, publish.
- **Business modules**: CRM, inventory, accounts and HR — deliberately simple.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres, Auth,
Storage) · Vercel.

## Running it locally

```bash
npm install
cp .env.example .env.local   # fill in the two Supabase values
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | development server |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Database

The schema lives in `supabase/migrations/`, applied in filename order. The first
account to sign up becomes the platform `SUPER_ADMIN`; everybody after them is a
normal user who creates their own company on first login.

## Layout

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the rules every file
follows, and [`legacy/README.md`](legacy/README.md) for the v1 app kept as
reference.
