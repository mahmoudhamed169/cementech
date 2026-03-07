"use server";

import { FactoryDataFormValues } from "../_schema/factory.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addFactoryAction(data: FactoryDataFormValues) {
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
    })),
  };

  const res = await fetch(`${API_URL}/factories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_factories",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to add factory");
  }

  return res.json();
}

export async function editFactoryAction(
  data: FactoryDataFormValues & { id: string },
) {
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
      name_en: p.nameEn,
      name_ar: p.nameAr,
      price: Number(p.price),
    })),
  };

  const res = await fetch(`${API_URL}/factories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_factories",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to update factory");
  }

  return res.json();
}

export async function deleteFactoryAction(id: string) {
  const res = await fetch(`${API_URL}/factories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_factories",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete factory");
  }

  return res.json();
}
