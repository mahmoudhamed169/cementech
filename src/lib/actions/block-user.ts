"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function toggleBlockUser(
  id: string,
  isBlocked: boolean,
  type: "customer" | "driver",
) {
  const session = await getServerSession(authOptions);

  const endpoint = isBlocked ? "unblock" : "block"; // ✅

  const res = await fetch(`${API_URL}/users/${id}/${endpoint}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      system_screen:
        type === "customer" ? "user_permission" : "driver_permission",
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Block user error:", {
      status: res.status,
      body: errorBody,
    });
    throw new Error(`Failed to block/unblock user: ${res.status}`);
  }

  revalidatePath(`/${type === "customer" ? "users" : "drivers"}/${id}`);

  return res.json();
}
