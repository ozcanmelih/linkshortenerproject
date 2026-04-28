import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds. No configuration needed.",
    badge: "Fast",
  },
  {
    title: "Centralized Dashboard",
    description:
      "Manage all your shortened links in one place. View, copy, and delete links whenever you need.",
    badge: "Organized",
  },
  {
    title: "Secure & Private",
    description:
      "Your links are tied to your account. Only you can see and manage the links you create.",
    badge: "Secure",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      {/* Hero */}
      <section className="flex w-full flex-col items-center gap-6 px-6 py-28 text-center">
        <Badge variant="outline" className="text-sm">
          Always free to use · No credit card required
        </Badge>
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight">
          Shorten links. Share with confidence.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Turn long, unwieldy URLs into clean short links you can share
          anywhere. Sign up for free and start managing your links today.
        </p>
        <Show when="signed-out">
          <div className="flex gap-3">
            <SignUpButton mode="modal">
              <Button size="lg">Get Started Free</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </Show>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl px-6 pb-28">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">
          Everything you need
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit text-xs">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t bg-muted/40 px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Ready to shorten your first link?
        </h2>
        <p className="mb-8 text-muted-foreground">
          Join today and take control of your links.
        </p>
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <Button size="lg">Create Free Account</Button>
          </SignUpButton>
        </Show>
      </section>
    </main>
  );
}
