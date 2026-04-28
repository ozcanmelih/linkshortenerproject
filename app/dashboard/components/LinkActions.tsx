"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditLinkDialog } from "./EditLinkDialog";
import { DeleteLinkDialog } from "./DeleteLinkDialog";
import type { Link } from "@/db/schema";

interface LinkActionsProps {
  link: Link;
}

export function LinkActions({ link }: LinkActionsProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setDeleteOpen(true)}
        >
          Delete
        </Button>
      </div>
      <EditLinkDialog link={link} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteLinkDialog
        link={link}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
