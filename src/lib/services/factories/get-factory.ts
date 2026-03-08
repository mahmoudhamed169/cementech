import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export interface FactoryProduct {
  id: string;
  name_en: string;
  name_ar: string;
  price: number;
}

export interface FactoryDetails {
  id: string;
  code: string;
  name_en: string;
  name_ar: string;
  location_en: string;
  location_ar: string;
  contact_number: string;
  is_active: boolean;
  lat: string;
  lng: string;
  created_at: string;
  updated_at: string;
  products: FactoryProduct[];
}

export interface FactoryDetailsResponse {
  success: boolean;
  message: string;
  data: FactoryDetails;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFactoryById(
  id: string,
): Promise<FactoryDetailsResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/factories/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "management",
      lang: "all",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch factory");
  }

  return res.json() as Promise<FactoryDetailsResponse>;
}
