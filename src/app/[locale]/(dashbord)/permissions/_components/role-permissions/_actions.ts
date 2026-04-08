"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { revalidateTag } from "next/cache";
import { CreatePermissionSchema } from "./_schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPermissionAction(data: CreatePermissionSchema) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/permissions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "management_permission",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(`Failed to create permission: ${res.status}`);
  }

  revalidateTag("permissions");
  return res.json();
}

export async function updatePermissionAction(
  id: string,
  data: CreatePermissionSchema,
) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/permissions/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "management_permission",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(`Failed to update permission: ${res.status}`);
  }

  revalidateTag("permissions");
  return res.json();
}

export async function deletePermissionAction(id: string) {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/permissions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "management_permission",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete permission: ${res.status}`);
  }

  revalidateTag("permissions");
  return res.json();
}
