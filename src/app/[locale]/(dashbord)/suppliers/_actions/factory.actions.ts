"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { FactoryDataFormValues } from "../_schema/factory.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function loggedFetch(
  url: string,
  options: RequestInit,
  actionName: string,
) {
  console.log(`\n========== [${actionName}] REQUEST ==========`);
  console.log("URL:", url);
  console.log("Method:", options.method);
  if (options.body instanceof FormData) {
    console.log("Body: [FormData]");
    (options.body as FormData).forEach((value, key) => {
      console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
    });
  }
  console.log("=============================================\n");

  const res = await fetch(url, options);

  const cloned = res.clone();
  let responseBody: unknown;
  try {
    responseBody = await cloned.json();
  } catch {
    responseBody = await cloned.text();
  }

  console.log(`\n========== [${actionName}] RESPONSE ==========`);
  console.log("Status:", res.status, res.statusText);
  console.log("Body:", responseBody);
  console.log("==============================================\n");

  return res;
}

function buildFormData(
  data: FactoryDataFormValues,
  session: Awaited<ReturnType<typeof getServerSession>>,
): { body: FormData; headers: Record<string, string> } {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${session?.user.accessToken}`,
    systemscreen: "factory_permission",
  };

  const formData = new FormData();

  formData.append("name_en", data.nameEn);
  formData.append("name_ar", data.nameAr);
  formData.append("contact_number", data.phone);
  formData.append("location_en", data.locationEn);
  formData.append("location_ar", data.locationAr);
  formData.append("lat", String(data.location?.lat ?? ""));
  formData.append("lng", String(data.location?.lng ?? ""));

  // ✅ NestJS @Transform بيقبل "true"/"false" كـ string
  formData.append("is_active", data.status ? "true" : "false");

  // ✅ products - price ودriver_price كـ numbers حقيقية مش strings
  // NestJS مش بيعرف يـ parse الـ nested objects من FormData brackets
  // → الحل: نبعت كـ JSON string وعلى الـ backend يعمل @Transform
  if (data.products && data.products.length > 0) {
    const products = data.products.map((p) => ({
      ...(p.id && { id: p.id }),
      name_en: p.nameEn,
      name_ar: p.nameAr,
      price: Number(p.price),
      driver_price: Number(p.driver_price),
      is_active: p.isActive, // boolean حقيقي جوه الـ JSON
    }));
    formData.append("products", JSON.stringify(products));
  }

  if (data.logo instanceof File) {
    formData.append("logo", data.logo);
  }

  return { body: formData, headers };
}

export async function addFactoryAction(data: FactoryDataFormValues) {
  const session = await getServerSession(authOptions);
  const { body, headers } = buildFormData(data, session);

  const res = await loggedFetch(
    `${API_URL}/factories`,
    { method: "POST", headers, body },
    "addFactoryAction",
  );

  if (!res.ok) throw new Error("Failed to add factory");

  revalidateTag("factories");
  return res.json();
}

export async function editFactoryAction(
  data: FactoryDataFormValues & { id: string },
) {
  const session = await getServerSession(authOptions);
  const { id, ...rest } = data;
  const { body, headers } = buildFormData(rest, session);

  const res = await loggedFetch(
    `${API_URL}/factories/${id}`,
    { method: "PATCH", headers, body },
    "editFactoryAction",
  );

  if (!res.ok) throw new Error("Failed to update factory");

  revalidateTag("factories");
  return res.json();
}

export async function deleteFactoryAction(id: string) {
  const session = await getServerSession(authOptions);

  const res = await loggedFetch(
    `${API_URL}/factories/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        systemscreen: "management",
      },
    },
    "deleteFactoryAction",
  );

  if (!res.ok) throw new Error("Failed to delete factory");

  revalidateTag("factories");
  return res.json();
}