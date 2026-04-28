"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLinkAction } from "./actions";

interface CreateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateLinkDialog({
  open,
  onOpenChange,
}: CreateLinkDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      setUrl("");
      setSlug("");
      setError(null);
    }
    onOpenChange(nextOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createLinkAction({ url, slug });
      if ("error" in result) {
        setError(result.error);
      } else {
        handleClose(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Short Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Short slug</Label>
            <Input
              id="slug"
              type="text"
              placeholder="my-link"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              required
              disabled={isPending}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating…" : "Create link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
