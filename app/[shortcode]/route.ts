import { NextResponse } from "next/server";
import { getLinkBySlug } from "@/data/links";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  const link = await getLinkBySlug(shortcode);

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(link.url);
}
