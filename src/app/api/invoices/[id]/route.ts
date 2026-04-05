import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  

  const res = await fetch(`${API_URL}/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      // system_screen: "invoices_permissions",
      // lang: "all",
    },
  });

  console.log("status:", res.status);

  if (!res.ok) {
    const error = await res.json();
    console.log("error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
