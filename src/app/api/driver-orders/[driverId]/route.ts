import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: Request,
  context: { params: Promise<{ driverId: string }> },
) {
  const session = await getServerSession(authOptions);

  const { driverId } = await context.params;

  const res = await fetch(
    `${API_URL}/orders/driver/${driverId}/delivered-orders`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
        systemscreen: "payments_permission",
        lang: "en",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch driver orders" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
