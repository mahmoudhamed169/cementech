import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/settings/pricing`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      systemscreen: "settings_permission",
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
