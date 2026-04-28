import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLinkButton } from "./components/CreateLinkButton";
import { LinkActions } from "./components/LinkActions";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const links = await getLinksByUserId(userId);

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Links</h1>
        <CreateLinkButton />
      </div>
      {links.length === 0 ? (
        <p className="text-muted-foreground">
          No links yet. Create your first short link to get started.
        </p>
      ) : (
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-base font-medium">
                    /{link.slug}
                  </CardTitle>
                  <CardDescription className="truncate">
                    {link.url}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                    <LinkActions link={link} />
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
