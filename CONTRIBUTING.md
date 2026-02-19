# Contributing to Console

Thanks for your interest in contributing. This document explains how to get set up and follow project conventions.

## Prerequisites

- **Node.js** 20.9+
- **pnpm** (e.g. `npm install -g pnpm`)

## Development setup

```bash
# Clone the repo (or your fork)
git clone <repo-url>
cd console

# Install dependencies
pnpm install

# Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Pre-commit hooks (Husky) will run automatically on `git commit`.

## Workflow

1. **Branch** from `main` (e.g. `feat/dashboard-cards`, `fix/sidebar-toggle`).
2. **Make changes** and keep commits focused and atomic.
3. **Run checks** before pushing:
   - `pnpm lint`
   - `pnpm format:check`
   - Fix with `pnpm format` if needed.
4. **Open a Pull Request** with a clear title and description.

## Commit message format

All commits must follow this format:

```
action(scope): short summary

- short explanation line 1
- short explanation line 2
- add any line as needed
```

**Examples:**

- `feat(dashboard): add revenue chart`
- `fix(sidebar): persist collapsed state in localStorage`
- `chore(deps): bump next to 16.1.6`

**Actions:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`  
**Scope:** optional area (e.g. `dashboard`, `layout`, `theme`).

## Code style

- **TypeScript**: strict mode, no `any` unless justified.
- **Formatting**: Prettier (run `pnpm format`); config in `.prettierrc`.
- **Linting**: ESLint with Next.js and Prettier; run `pnpm lint`.

Pre-commit runs `pnpm lint` and `pnpm format:check`, so fix any issues before committing.

## Project structure

- `app/` — Next.js App Router routes and layouts.
- `components/` — Reusable UI and layout components.
- `stores/` — MobX stores and context.
- `data/` — Mock data (no backend).
- `styles/` — Theme and global CSS (Untitled UI).
- `utils/` — Helpers (e.g. `cx` for class names).

Use the `@/*` path alias for imports from the project root.

## Questions

Open an issue for bugs, feature ideas, or questions. For small fixes (typos, docs), a direct PR is fine.

Thank you for contributing.
