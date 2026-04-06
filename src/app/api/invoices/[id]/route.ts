import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.user.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Invoice ID is required" },
      { status: 400 },
    );
  }

  const type = req.nextUrl.searchParams.get("type") ?? "orders";

  try {
    const res = await fetch(`${API_URL}/invoices/${id}?type=${type}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Invoice fetch error:", { status: res.status, error });
      return NextResponse.json(
        { error: error?.message ?? "Failed to fetch invoice" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
