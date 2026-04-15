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

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("[deliverSingleBonusAction] error:", errorBody);
    throw new Error(
      errorBody?.message ?? `Failed to deliver bonus: ${res.status}`,
    );
  }
  revalidateTag("driver-financial-stats");
  return res.json();
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
  formData.append("driverInOrderIds", JSON.stringify(data.orderIds));
  formData.append("invoice_picture", data.invoice_picture);
  formData.append("amount", data.amount);
  formData.append("note", data.note);

  const res = await fetch(`${API_URL}/driver-orders/multi-invoice-picture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "payments_permissions",
    },
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("[deliverBulkBonusAction] error:", errorBody);
    throw new Error(
      errorBody?.message ?? `Failed to deliver bulk bonus: ${res.status}`,
    );
  }

  revalidateTag("driver-financial-stats");
  return res.json();
}
