"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateLinkDialog } from "./CreateLinkDialog";

export function CreateLinkButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Link</Button>
      <CreateLinkDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
