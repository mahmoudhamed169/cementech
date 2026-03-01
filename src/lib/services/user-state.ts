export interface UsersStat {
  total: number;
  active: number;
  inactive: number;
  blocked: number;
}

export interface UsersStatsResponse {
  success: boolean;
  message: string;
  data: UsersStat;
}

export interface GetUsersStatsParams {
  type: "customer" | "driver" | "admin";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsersStats(
  params: GetUsersStatsParams,
): Promise<UsersStatsResponse> {
  const query = new URLSearchParams();

  query.append("type", params.type);

  const res = await fetch(`${API_URL}/users/stats?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_users_stats",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch users stats");
  }

  return res.json() as Promise<UsersStatsResponse>;
}
