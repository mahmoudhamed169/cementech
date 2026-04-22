"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { SupervisorFormValues } from "../_components/supervisors-form/schema";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OriginalValues {
  name: string;
  phone: string;
  permission_id: string;
}

export async function updateSupervisorAction(
  id: string,
  data: SupervisorFormValues,
  original: OriginalValues,
) {
  const session = await getServerSession(authOptions);

  const payload: Record<string, string> = {
    role: "admin",
  };

  if (data.name !== original.name) payload.admin_name = data.name;
  if (data.phone !== original.phone) payload.phone = data.phone;
  if (data.roles[0] !== original.permission_id)
    payload.permission_id = data.roles[0];

  console.log("🆔 supervisor id:", id);
  console.log("📦 payload (only changed):", payload);
  console.log("🔑 token:", session?.user.accessToken);
  console.log("🌐 url:", `${API_URL}/users/${id}`);

  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
      systemscreen: "supervisors_permission",
    },
    body: JSON.stringify(payload),
  });

  console.log("📡 status:", res.status);

  if (!res.ok) {
    const errorBody = await res.json();
    console.log("❌ error body:", errorBody);
    throw new Error(
      errorBody?.message ?? `Failed to update supervisor: ${res.status}`,
    );
  }

  revalidateTag("supervisors");
  return res.json();
}
