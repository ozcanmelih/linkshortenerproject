# UI Components

## Overview

All UI elements in this app are built with **shadcn/ui**. Never create custom components from scratch — always use or compose from shadcn/ui primitives.

## Non-Negotiable Rules

- **Never** create custom UI components. Use shadcn/ui components exclusively.
- **Never** write raw HTML elements (`<button>`, `<input>`, `<dialog>`, etc.) where a shadcn/ui equivalent exists.
- **Do not edit** files inside `components/ui/` — these are shadcn-generated. Extend them via composition in other files.
- Use `cn()` from `lib/utils.ts` for all conditional or merged class names.

## Adding Components

Install new shadcn/ui components via the CLI:

```bash
npx shadcn@latest add <component-name>
```

This places the generated file in `components/ui/`. Import from there:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

## Composition Pattern

If you need a reusable UI pattern (e.g. a form with a button), compose shadcn primitives into a new component outside of `components/ui/`:

```tsx
// components/short-link-form.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ShortLinkForm() {
  return (
    <form>
      <Input placeholder="https://example.com" />
      <Button type="submit">Shorten</Button>
    </form>
  );
}
```
