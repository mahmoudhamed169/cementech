// app/api/orders/[id]/tracking/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const lang = req.headers.get("lang") ?? "ar";

  console.log("📡 Fetching tracking for order:", id);

  const res = await fetch(`${API_URL}/orders/${id}/location`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "order_permission",
      lang,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error(
      "❌ Backend error:",
      res.status,
      JSON.stringify(errorBody, null, 2),
    );
    return NextResponse.json(
      { error: "Failed to fetch tracking data", details: errorBody },
      { status: res.status },
    );
  }

  const data = await res.json();
  console.log("✅ Tracking response:", JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}
