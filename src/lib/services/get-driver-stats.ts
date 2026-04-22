import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface DriverStatusItem {
  status: string;
  totalDrivers: number;
}

export interface ApiDriverStats {
  statuses: DriverStatusItem[];
  totalDrivers: number;
}

export async function getDriverStats(): Promise<ApiDriverStats> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/users/driverProfile/driverStats`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "home_permissions",
    },
    next: { tags: ["driver-stats"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch driver stats: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
