import { DriverProfile, DriverProfileResponse } from "../types/driver";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// -------------------------
// Fetch Driver profile
// -------------------------
export async function fetchDriver(
  id: string
): Promise<DriverProfile> {
  const res = await fetch(`${API_URL}/users/${id}/driverProfile`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_users",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch driver");
  }

  const result: DriverProfileResponse = await res.json();

  return result.data;
}