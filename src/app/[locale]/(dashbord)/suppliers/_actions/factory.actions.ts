"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { FactoryDataFormValues } from "../_schema/factory.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Helper function لطباعة الـ request والـ response
async function loggedFetch(
  url: string,
  options: RequestInit,
  actionName: string,
) {
  console.log(`\n========== [${actionName}] REQUEST ==========`);
  console.log("URL:", url);
  console.log("Method:", options.method);
  console.log("Headers:", options.headers);
  if (options.body) {
    console.log("Body:", JSON.parse(options.body as string));
  }
  console.log("=============================================\n");

  const res = await fetch(url, options);

  // ✅ نسخ الـ response عشان نقدر نقرأه مرتين (مرة للـ log ومرة للـ return)
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

export async function addFactoryAction(data: FactoryDataFormValues) {
  const session = await getServerSession(authOptions);

  const body = {
    name_en: data.nameEn,
    name_ar: data.nameAr,
    contact_number: data.phone,
    is_active: data.status,
    location_en: data.locationEn,
    location_ar: data.locationAr,
    lat: String(data.location?.lat ?? ""),
    lng: String(data.location?.lng ?? ""),
    products: data.products?.map((p) => ({
      name_en: p.nameEn,
      name_ar: p.nameAr,
      price: Number(p.price),
      driver_price: Number(p.driver_price),
      is_active: p.isActive, // ✅
    })),
  };

  const res = await loggedFetch(
    `${API_URL}/factories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
        systemscreen: "factory_permission",
      },
      body: JSON.stringify(body),
    },
    "addFactoryAction",
  );

  if (!res.ok) {
    throw new Error("Failed to add factory");
  }

  revalidateTag("factories");
  return res.json();
}

export async function editFactoryAction(
  data: FactoryDataFormValues & { id: string },
) {
  const session = await getServerSession(authOptions);
  const { id, ...rest } = data;

  const body = {
    name_en: rest.nameEn,
    name_ar: rest.nameAr,
    contact_number: rest.phone,
    is_active: rest.status,
    location_en: rest.locationEn,
    location_ar: rest.locationAr,
    lat: String(rest.location?.lat ?? ""),
    lng: String(rest.location?.lng ?? ""),
    products: rest.products?.map((p) => ({
      ...(p.id && { id: p.id }), // ✅ بيبعت الـ id بس لو موجود
      name_en: p.nameEn,
      name_ar: p.nameAr,
      price: Number(p.price),
      driver_price: Number(p.driver_price),
      is_active: p.isActive,
    })),
  };

  const res = await loggedFetch(
    `${API_URL}/factories/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
        systemscreen: "factory_permission",
      },
      body: JSON.stringify(body),
    },
    "editFactoryAction",
  );

  if (!res.ok) {
    throw new Error("Failed to update factory");
  }

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

  if (!res.ok) {
    throw new Error("Failed to delete factory");
  }

  revalidateTag("factories");
  return res.json();
}
