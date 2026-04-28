# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository.

## Project Overview

A URL shortener web application built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Clerk authentication, and a Neon PostgreSQL database managed via Drizzle ORM. Users can create short links that redirect to long URLs.

## Non-Negotiable Rules

1. **TypeScript strict mode** — all code must type-check with zero errors.
2. **Server Components by default** — only use `"use client"` when required (hooks, browser APIs, event handlers).
3. **Never build custom auth** — use Clerk exclusively.
4. **Never expose secrets** — all keys and connection strings go in `.env.local`.
5. **Database access is server-only** — all queries run in Server Components, Server Actions, or route handlers.
6. **Use `cn()` for class merging** — never concatenate Tailwind strings manually.
7. **Do not edit `components/ui/`** — these are shadcn-generated; extend via composition.
8. **Never use `middleware.ts`** — `middleware.ts` is deprecated in the version of Next.js used in this project (Next.js 16). Use `proxy.ts` instead for all middleware/proxy needs.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npx drizzle-kit push      # Push schema changes to Neon (dev)
npx drizzle-kit generate  # Generate migration files
```
