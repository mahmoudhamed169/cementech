"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendOtpAction(phone: string) {
  const res = await fetch(`${API_URL}/phoneLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, role: "admin" }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Failed to send OTP");
  }

  return { transactionId: json.data.transactionId };
}
