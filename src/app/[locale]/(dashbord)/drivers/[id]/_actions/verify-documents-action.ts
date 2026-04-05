"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function acceptDocumentsAction(userId: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${userId}/accept-documents`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(`Failed to accept documents: ${res.status}`);
  }

  revalidatePath(`/drivers/${userId}`);
  return res.json();
}

export async function rejectDocumentsAction(userId: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${userId}/reject-documents`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(`Failed to reject documents: ${res.status}`);
  }

  revalidatePath(`/drivers/${userId}`);
  return res.json();
}
