import { DriverProfile, DriverProfileResponse } from "../types/driver";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function fetchDriver(id: string): Promise<DriverProfile> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/${id}/driverProfile`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "driver_permission",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch driver");
  }

  const result: DriverProfileResponse = await res.json();

  return result.data;
}
