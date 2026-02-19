# Console

A minimal, enterprise-style frontend dashboard built with Next.js 16 and the Untitled UI design system. No authentication or backend—mock data only, ready for future expansion.

## Tech stack

| Area            | Choice                                                                |
| --------------- | --------------------------------------------------------------------- |
| Framework       | **Next.js 16** (App Router)                                           |
| Language        | **TypeScript**                                                        |
| Package manager | **pnpm**                                                              |
| Styling         | **Untitled UI** (Tailwind CSS v4, design tokens, `@untitledui/icons`) |
| Font            | **Inter** (`next/font`)                                               |
| State           | **MobX** + **mobx-react-lite**                                        |
| Theme           | **Light / Dark** (next-themes, persisted in localStorage)             |
| Route progress  | **nextjs-toploader**                                                  |

No authentication, no API calls—all data is in-repo mock data.

## Prerequisites

- **Node.js** 20.9+
- **pnpm** (e.g. `npm install -g pnpm`)

## Getting started

```bash
# Install dependencies
pnpm install

# Run development server (Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/dashboard`.

### Other commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start dev server with Turbopack       |
| `pnpm build`        | Production build                      |
| `pnpm start`        | Start production server               |
| `pnpm lint`         | Run ESLint                            |
| `pnpm format`       | Format code with Prettier             |
| `pnpm format:check` | Check formatting (used in pre-commit) |

## Project structure

```
console/
├── app/
│   ├── layout.tsx                 # Root layout: Inter, globals, NextTopLoader, providers
│   ├── page.tsx                   # Home → redirect to /dashboard
│   ├── globals.css                # Tailwind v4, theme import, plugins, base styles
│   └── (dashboard)/
│       ├── layout.tsx             # Shared dashboard layout (sidebar + header)
│       ├── dashboard/
│       │   └── page.tsx           # Dashboard: stats cards + team list (mock data)
│       └── orders/
│           └── page.tsx           # Orders placeholder
├── components/
│   └── dashboard-layout/
│       ├── index.tsx              # Layout wrapper (sidebar + header + main)
│       ├── sidebar.tsx            # Nav (Dashboard, Orders), collapse toggle
│       └── header.tsx             # Theme toggle (light/dark)
├── providers/
│   ├── route-provider.tsx         # React Aria RouterProvider for next/navigation
│   ├── theme-provider.tsx        # next-themes (light-mode / dark-mode classes)
│   └── theme-sync.tsx            # Syncs MobX theme → next-themes
├── stores/
│   ├── ui-store.ts               # theme, sidebarOpen; localStorage persistence
│   └── store-context.tsx         # StoreProvider, useStores()
├── data/
│   └── mock-dashboard.ts         # MOCK_STATS, MOCK_USERS (fake data)
├── utils/
│   └── cx.ts                     # tailwind-merge + sortCx (Untitled UI)
├── styles/
│   └── theme.css                 # Untitled UI @theme + .dark-mode overrides
├── .husky/
│   └── pre-commit                # Runs: pnpm lint, pnpm format:check
├── .prettierrc
├── .prettierignore
├── postcss.config.mjs            # @tailwindcss/postcss
├── next.config.ts
├── tsconfig.json                 # Path alias: @/*
├── eslint.config.mjs            # Next + TypeScript + eslint-config-prettier
└── package.json
```

## Features

- **App Router**: One folder per route (`/dashboard`, `/orders`); shared layout via `(dashboard)` group.
- **Untitled UI**: Global design tokens in `styles/theme.css`, Tailwind v4, `@untitledui/icons`, and `next-themes` for light/dark.
- **MobX**: UI store holds `theme` and `sidebarOpen`; theme is persisted in `localStorage` and synced to the DOM via `ThemeSync`.
- **Dashboard**: Stat cards (revenue, users, orders) and a team list with placeholder avatars (DiceBear); all data from `data/mock-dashboard.ts`.
- **Tooling**: ESLint and Prettier work together; Husky pre-commit runs `pnpm lint` and `pnpm format:check`.

## Configuration

- **Path alias**: `@/*` → project root (see `tsconfig.json`).
- **Images**: `next.config.ts` allows `api.dicebear.com` for avatar URLs.
- **Theme**: Untitled UI uses `.light-mode` and `.dark-mode` on the root; the theme toggle updates MobX and next-themes.

## Future expansion

The app is set up so you can add:

- Real API calls and data fetching
- A tables library for orders and other lists
- Authentication and protected routes
- Additional pages and layout sections

---

Built with [Next.js](https://nextjs.org), [Untitled UI](https://www.untitledui.com/react), and [MobX](https://mobx.js.org).
