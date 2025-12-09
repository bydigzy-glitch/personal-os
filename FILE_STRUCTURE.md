# FreelancerOS - File Structure

```
freelancer-os/
│
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml                    # GitHub Actions CI/CD pipeline
│   └── PULL_REQUEST_TEMPLATE.md         # PR template
│
├── public/                               # Static assets
│
├── scripts/
│   ├── setup-github.sh                  # GitHub repository setup script
│   └── quick-start.sh                   # Quick start development script
│
├── src/
│   ├── app/                             # Next.js App Router
│   │   ├── auth/
│   │   │   ├── callback/
│   │   │   │   └── route.ts            # OAuth callback handler
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx            # Sign-in page
│   │   │   └── sign-up/
│   │   │       └── page.tsx            # Sign-up page
│   │   ├── apps/
│   │   │   └── page.tsx                # Apps listing page
│   │   ├── files/
│   │   │   └── page.tsx                # Files listing page
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx            # Project detail page
│   │   │   └── page.tsx                # Projects listing page
│   │   ├── settings/
│   │   │   └── page.tsx                # Settings page
│   │   ├── globals.css                 # Global styles (Tailwind v4)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Dashboard (home page)
│   │   └── not-found.tsx               # 404 page
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   └── textarea.tsx
│   │   ├── dashboard/                  # Dashboard components
│   │   │   ├── dashboard-layout.tsx    # Main layout with sidebar
│   │   │   ├── project-card.tsx        # Project card
│   │   │   ├── file-card.tsx           # File card
│   │   │   └── app-card.tsx            # App card
│   │   ├── projects/                   # Project components
│   │   │   ├── create-project-dialog.tsx
│   │   │   ├── update-project-form.tsx
│   │   │   └── delete-project-button.tsx
│   │   ├── files/                      # File components
│   │   │   └── upload-file-dialog.tsx
│   │   ├── apps/                       # App components
│   │   │   └── create-app-dialog.tsx
│   │   └── settings/                   # Settings components
│   │       └── update-profile-form.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser Supabase client
│   │   │   ├── server.ts               # Server Supabase client
│   │   │   └── database.types.ts       # TypeScript database types
│   │   └── utils.ts                    # Utility functions
│   │
│   └── middleware.ts                   # Auth middleware
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql      # Database schema & RLS policies
│
├── .env.example                        # Environment variables template
├── .env.local                          # Local environment variables (gitignored)
├── .gitignore                          # Git ignore rules
├── components.json                     # shadcn/ui configuration
├── eslint.config.mjs                   # ESLint configuration
├── next.config.ts                      # Next.js configuration
├── package.json                        # Dependencies and scripts
├── postcss.config.mjs                  # PostCSS configuration
├── tsconfig.json                       # TypeScript configuration
│
├── DOCUMENTATION.md                    # Technical documentation
├── PROJECT_SUMMARY.md                  # Project completion summary
├── README.md                           # Main README
├── SETUP_GUIDE.md                      # Step-by-step setup guide
└── FILE_STRUCTURE.md                   # This file
```

## Key Directories

### `/src/app`
Contains all Next.js App Router pages and routes. Each folder represents a route in the application.

### `/src/components`
Reusable React components organized by feature:
- `ui/` - Base UI components from shadcn/ui
- `dashboard/` - Dashboard-specific components
- `projects/`, `files/`, `apps/`, `settings/` - Feature-specific components

### `/src/lib`
Utility functions and configurations:
- `supabase/` - Supabase client setup and TypeScript types
- `utils.ts` - Helper functions

### `/supabase/migrations`
SQL migration files for database schema, RLS policies, and triggers.

### `/.github`
GitHub-specific files:
- `workflows/` - GitHub Actions CI/CD pipelines
- Templates for pull requests

### `/scripts`
Automation scripts for setup and development.

## File Naming Conventions

- **Pages**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Routes**: `route.ts` (Next.js API routes)
- **Components**: `kebab-case.tsx` (e.g., `project-card.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `utils.ts`)
- **Types**: `database.types.ts`

## Import Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
```

## Environment Files

- `.env.example` - Template with placeholder values (committed)
- `.env.local` - Actual values for local development (gitignored)
- Production env vars are set in Vercel dashboard

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - Linting rules
- `postcss.config.mjs` - PostCSS plugins
- `components.json` - shadcn/ui component configuration

## Total File Count

- **TypeScript/TSX Files**: ~30
- **Configuration Files**: ~7
- **Documentation Files**: ~5
- **SQL Files**: 1
- **Scripts**: 2
- **Workflows**: 1

---

This structure follows Next.js 15 App Router best practices and provides a clear separation of concerns for maintainability and scalability.
