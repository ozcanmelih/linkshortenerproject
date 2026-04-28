---
description: Read this before implementing or modifying server actions in the project.
---

# Server Actions

## Overview

All data mutations must be performed via **server actions**. Server actions are the only place where database write operations occur.

## Non-Negotiable Rules

- **All mutations** must use server actions — never mutate data in route handlers or directly from components.
- Server actions **must be called from client components** only.
- Server action files **must be named `actions.ts`** and **colocated** in the same directory as the client component that calls them.
- **Never use `FormData`** as a TypeScript type for action arguments — always define explicit TypeScript types.
- **All input data must be validated with Zod** before any database operation.
- **Always verify a logged-in user** (via Clerk) at the top of every server action before proceeding.
- **Never write Drizzle queries directly** inside server actions — use the helper functions in `/data` instead.
- **Never `throw` errors** from server actions — always return a typed result object with either a `success` or `error` property.

## File Placement

```
app/
  dashboard/
    components/
      CreateLinkForm.tsx   ← client component
      actions.ts           ← server actions for CreateLinkForm
```

## Structure of a Server Action

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const CreateLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

type CreateLinkInput = z.infer<typeof CreateLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = CreateLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await createLink({ ...parsed.data, userId });
  return { success: true };
}
```

## Data Helpers (`/data`)

Database queries are wrapped in helper functions located in `/data` (e.g., `data/links.ts`). Server actions call these helpers — they do not use Drizzle directly.
