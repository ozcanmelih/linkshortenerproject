# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository. All coding standards and architectural decisions are documented in the `/docs` directory.

> [!CAUTION]
> **BLOCKING REQUIREMENT — NO EXCEPTIONS:** You MUST read every relevant file in the `/docs` directory BEFORE generating ANY code, making ANY edit, or proposing ANY implementation. This is non-negotiable. Skipping this step will result in incorrect, inconsistent, or non-compliant output. If a task touches auth, UI, database, or routing — open and read the corresponding doc file first. Do not rely on memory or assumptions about what the docs say.

## Project Overview

A URL shortener web application built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Clerk authentication, and a Neon PostgreSQL database managed via Drizzle ORM. Users can create short links that redirect to long URLs.

## Documentation Index

**Read the relevant file(s) below FIRST — before writing a single line of code.**

| File | Description | Read when... |
|---|---|---|
| [docs/auth.md](docs/auth.md) | Clerk authentication rules, route protection, redirects, and modal sign-in/sign-up | Any task involving auth, protected routes, sign-in/sign-up, or user sessions |
| [docs/ui.md](docs/ui.md) | shadcn/ui component standards, composition patterns, and rules against custom components | Any task involving UI components, layouts, forms, or styling |


## Non-Negotiable Rules

1. **TypeScript strict mode** — all code must type-check with zero errors.
2. **Server Components by default** — only use `"use client"` when required (hooks, browser APIs, event handlers).
3. **Never build custom auth** — use Clerk exclusively.
4. **Never expose secrets** — all keys and connection strings go in `.env.local`.
5. **Database access is server-only** — all queries run in Server Components, Server Actions, or route handlers.
6. **Use `cn()` for class merging** — never concatenate Tailwind strings manually.
7. **Do not edit `components/ui/`** — these are shadcn-generated; extend via composition.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npx drizzle-kit push      # Push schema changes to Neon (dev)
npx drizzle-kit generate  # Generate migration files
```
