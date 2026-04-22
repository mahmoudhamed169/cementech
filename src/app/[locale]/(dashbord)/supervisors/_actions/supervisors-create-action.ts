// supervisors-create-action.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { SupervisorFormValues } from "../_components/supervisors-form/schema";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createSupervisorAction(data: SupervisorFormValues) {
  const session = await getServerSession(authOptions);

  const payload = {
    admin_name: data.name,
    phone: data.phone,
    permission_id: data.roles[0],
    role: "admin",
  };

  console.log("🚀 payload:", payload);
  console.log("🔑 token:", session?.user.accessToken);

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
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
      errorBody?.message ?? `Failed to create supervisor: ${res.status}`,
    );
  }

  revalidateTag("supervisors");
  return res.json();
}
