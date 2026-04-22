# Authentication

## Overview

Authentication is handled **exclusively by Clerk** (`@clerk/nextjs`). Never implement custom auth, session management, JWT handling, or any third-party auth alternative.

## Non-Negotiable Rules

- **Never** build custom auth or use any auth library other than Clerk.
- Sign-in and Sign-up flows **must always** open as a **modal** — never redirect to a dedicated sign-in/sign-up page.
- `/dashboard` is a **protected route** — unauthenticated users must be redirected to sign in.
- Authenticated users visiting `/` (homepage) must be **redirected to `/dashboard`**.

## ClerkProvider

`ClerkProvider` wraps the entire app in `app/layout.tsx`. Do not move or duplicate it.

## Route Protection & Redirects

Use Clerk middleware (`proxy.ts`) to enforce route-level auth:

```ts
// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from the homepage
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard — Clerk will handle the sign-in redirect
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

## Modal Sign-In / Sign-Up

Always use `mode="modal"` on Clerk's button components. Never link to `/sign-in` or `/sign-up` pages.

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

## UI Components

| Component | Purpose |
|---|---|
| `<SignInButton mode="modal">` | Opens the Clerk sign-in modal |
| `<SignUpButton mode="modal">` | Opens the Clerk sign-up modal |
| `<UserButton>` | User avatar with account management dropdown |
| `<SignedIn>` | Renders children only when authenticated |
| `<Show when="signed-out">` | Renders children only when unauthenticated |

## Getting the Current User

### Server Components / Server Actions

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) throw new Error("Unauthenticated");

const user = await currentUser(); // full user object
```

### Client Components

```ts
import { useUser, useAuth } from "@clerk/nextjs";

const { userId, isLoaded, isSignedIn } = useAuth();
const { user } = useUser();
```
