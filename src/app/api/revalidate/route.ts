import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tag } = await req.json();
  revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: true });
}
