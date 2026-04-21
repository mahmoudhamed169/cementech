// _actions/deliver-bonus-action.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Single ───────────────────────────────────────────
export async function deliverSingleBonusAction(data: {
  orderId: string;
  invoice_picture: File;
  amount: string;
  note: string;
}) {
  const session = await getServerSession(authOptions);

  const formData = new FormData();
  formData.append("invoice_picture", data.invoice_picture);
  formData.append("amount", data.amount);

  console.log("[deliverSingleBonusAction] REQUEST:", {
    url: `${API_URL}/driver-orders/${data.orderId}/invoice-picture`,
    method: "PATCH",
    body: { amount: data.amount, invoice_picture: data.invoice_picture?.name },
  });

  const res = await fetch(
    `${API_URL}/driver-orders/${data.orderId}/invoice-picture`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        system_screen: "payments_permissions",
      },
      body: formData,
    },
  );

  const responseBody = await res.json();

  console.log("[deliverSingleBonusAction] RESPONSE:", {
    status: res.status,
    ok: res.ok,
    body: responseBody,
  });

  if (!res.ok) {
    console.error("[deliverSingleBonusAction] error:", responseBody);
    throw new Error(
      responseBody?.message ?? `Failed to deliver bonus: ${res.status}`,
    );
  }

  revalidateTag("driver-financial-stats");
  return responseBody;
}

// ─── Bulk ─────────────────────────────────────────────
export async function deliverBulkBonusAction(data: {
  orderIds: string[];
  invoice_picture: File;
  amount: string;
  note: string;
}) {
  const session = await getServerSession(authOptions);

  const formData = new FormData();

  // ✅ بنبعت كل id لوحده كـ array
  data.orderIds.forEach((id) => {
    formData.append("driverInOrderIds[]", id);
  });

  formData.append("invoice_picture", data.invoice_picture);
  formData.append("amount", data.amount);
  formData.append("note", data.note);

  console.log("[deliverBulkBonusAction] REQUEST:", {
    url: `${API_URL}/driver-orders/multi-invoice-picture`,
    method: "PATCH",
    body: {
      orderIds: data.orderIds,
      amount: data.amount,
      note: data.note,
      invoice_picture: data.invoice_picture?.name,
    },
  });

  const res = await fetch(`${API_URL}/driver-orders/multi-invoice-picture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "payments_permissions",
    },
    body: formData,
  });

  const responseBody = await res.json();

  console.log("[deliverBulkBonusAction] RESPONSE:", {
    status: res.status,
    ok: res.ok,
    body: responseBody,
  });

  if (!res.ok) {
    console.error("[deliverBulkBonusAction] error:", responseBody);
    throw new Error(
      responseBody?.message ?? `Failed to deliver bulk bonus: ${res.status}`,
    );
  }

  revalidateTag("driver-financial-stats");
  return responseBody;
}