import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const lang = req.headers.get("lang") ?? "ar";

  const res = await fetch(`${API_URL}/settings/delivery-locations`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "settings_permission",
      lang,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch delivery locations" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
