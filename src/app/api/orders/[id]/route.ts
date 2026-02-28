import { getOrderById } from "@/src/lib/services/orders/spacific-order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Order ID is required" },
      { status: 400 },
    );
  }

  try {
    const response = await getOrderById(id);

    if (!response.success) {
      return NextResponse.json(
        { success: false, message: response.message || "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching order:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
