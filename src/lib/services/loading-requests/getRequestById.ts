// src/lib/services/loading-requests/getRequestById.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

export interface RequestLog {
  id: string;
  request_id: string;
  actor_id: string;
  message_en: string;
  message_ar: string;
  created_at: string;
}

export interface RequestData {
  id: string;
  code: string;
  product_id: string;
  quantity: number;
  location: string | null;
  product_name: string;
  factory_name: string;
  trip_certificate: string | null;
  laying_command: string | null;
  lat: number | null;
  lng: number | null;
  request_status: string;
  driver_id: string;
  driver_name: string;
  phone_number: string;
  car_plates: string;
  created_at: string;
  updated_at: string;
  loaded_at: string | null;
  logs: RequestLog[];
}

export interface RequestResponse {
  success: boolean;
  data: RequestData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRequestById(
  requestId: string,
  lang: "ar" | "en",
): Promise<RequestResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/requests/${requestId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "loading_request_permission",
      lang,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch request. Status: ${res.status}`);
  }

  return res.json() as Promise<RequestResponse>;
}
