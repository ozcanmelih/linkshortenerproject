"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/links";

const LinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may only contain lowercase letters, numbers, and hyphens"
    ),
});

type LinkInput = z.infer<typeof LinkSchema>;

export async function createLinkAction(
  input: LinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = LinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await createLink({ ...parsed.data, userId });
  } catch {
    return { error: "That slug is already taken. Please choose a different one." };
  }

  return { success: true };
}

export async function updateLinkAction(
  id: number,
  input: LinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = LinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const updated = await updateLink(id, userId, parsed.data);
    if (!updated) return { error: "Link not found." };
  } catch {
    return { error: "That slug is already taken. Please choose a different one." };
  }

  return { success: true };
}

export async function deleteLinkAction(
  id: number
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const deleted = await deleteLink(id, userId);
  if (!deleted) return { error: "Link not found." };

  return { success: true };
}
