"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function acceptRequestAction(
  requestId: string,
  data: {
    request_type: "with_data" | "without_data";
    trip_certificate?: File;
    laying_command?: File;
  },
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);

  const formData = new FormData();
  formData.append("request_type", data.request_type);

  if (data.trip_certificate) {
    formData.append("trip_certificate", data.trip_certificate);
  }
  if (data.laying_command) {
    formData.append("laying_command", data.laying_command);
  }

  console.log("➡️ Accept Request REQUEST:", {
    url: `${API_URL}/requests/${requestId}/acceptRequest`,
    method: "POST",
    request_type: data.request_type,
  });

  const res = await fetch(`${API_URL}/requests/${requestId}/acceptRequest`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "loading_request_permission",
      lang: "en",
    },
    body: formData,
  });

  const responseText = await res.text();
  console.log("⬅️ Accept Request RESPONSE:", {
    status: res.status,
    ok: res.ok,
    body: responseText,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to accept request. Status: ${res.status} | Body: ${responseText}`,
    );
  }

  revalidateTag("requests");
  revalidateTag("requestId");

  return JSON.parse(responseText);
}
