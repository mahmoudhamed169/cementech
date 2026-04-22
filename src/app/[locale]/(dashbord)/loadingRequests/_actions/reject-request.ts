"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function rejectRequest(
  requestId: string,
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/requests/${requestId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "loading_request_permission",
    },
    body: JSON.stringify({ status: "rejected" }),
  });

  if (!res.ok) {
    const error = await res.json();
    return {
      success: false,
      message: error.message ?? "Failed to reject request",
    };
  }

  revalidateTag("requests");
  return { success: true, message: "Request rejected successfully" };
}
