import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Welcome to Link Shortener
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Create short links that redirect to long URLs. Sign in to get started.
        </p>
        <Show when="signed-out">
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </Show>
      </main>
    </div>
  );
}
