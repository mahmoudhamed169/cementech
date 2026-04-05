"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidatePath } from "next/cache";
import { TermsPolicy } from "../_types/terms.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UpdatePolicyPayload {
  type: TermsPolicy["type"];
  target: TermsPolicy["target"];
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  version: string;
  status: "published" | "draft";
}

export async function updatePolicyAction(
  id: string,
  payload: UpdatePolicyPayload,
) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/policies/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      system_screen: "",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      `Failed to update policy: ${res.status} — ${errorBody?.message ?? "Unknown error"}`,
    );
  }

  revalidatePath("/terms");
  return res.json();
}
