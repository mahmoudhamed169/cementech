import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get("product_id");
  const quantity = searchParams.get("quantity");
  const order_id = searchParams.get("order_id");

  if (!product_id || !quantity || !order_id) {
    return NextResponse.json(
      { success: false, message: "product_id and quantity are required" },
      { status: 400 },
    );
  }

  const query = new URLSearchParams({ product_id, quantity, order_id });

  const res = await fetch(`${API_URL}/users/near-drivers?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "order_permission",
      lang: "en",
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Near drivers error:", {
      status: res.status,
      body: errorBody,
    });
    return NextResponse.json(
      { success: false, message: "Failed to fetch near drivers" },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
