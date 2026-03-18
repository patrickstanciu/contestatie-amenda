# Copilot Instructions

This is a Next.js 16 application (App Router) built with React 19 and TypeScript. The app is intended for disputing traffic fines ("contestatie amenda" in Romanian).

## Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (flat config, ESLint 9)
```

No test runner is configured.

## Architecture

- **App Router** only — all routes live under `src/app/`. No `pages/` directory.
- New pages: `src/app/[route]/page.tsx`. New layouts: `src/app/[route]/layout.tsx`.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`) — do not manually add `useMemo`/`useCallback` for performance; the compiler handles this.
- Components in `src/app/` are **Server Components by default**. Add `'use client'` only when you need browser APIs, event handlers, or React hooks.

## Styling

- **Tailwind CSS 4** using the CSS-first `@import "tailwindcss"` approach — there is no `tailwind.config.js`.
- Theme tokens are CSS variables defined in `src/app/globals.css` under `:root` and `@theme inline`. Extend the theme there, not in a config file.
- Dark mode is handled via `prefers-color-scheme` media query (already configured). Use Tailwind's `dark:` variant for dark mode overrides.

## TypeScript Conventions

- **Strict mode** is on. Avoid `any`.
- Use `import type` for type-only imports: `import type { Metadata } from "next"`.
- Use the `@/` path alias for all internal imports (maps to `src/`): `import { X } from "@/components/X"`.
- Wrap component props with `Readonly<{...}>` as established in `layout.tsx`.

## Project Structure Conventions

As the codebase grows, follow this layout:

```
src/
  app/           # Routes (pages, layouts, loading, error)
  components/    # Reusable UI components
  lib/           # Utilities, helpers, data-fetching logic
  hooks/         # Custom React hooks
```

## ESLint

Uses **flat config** (`eslint.config.mjs`) with `next/core-web-vitals` and `next/typescript` rulesets. Run `npm run lint` before committing.
