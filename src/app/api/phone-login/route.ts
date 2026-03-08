import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/phoneLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, role: "admin" }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    return NextResponse.json({ error: json.message }, { status: 400 });
  }

  return NextResponse.json({ transactionId: json.data.transactionId });
}
