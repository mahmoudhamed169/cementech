export interface GetUsersParams {
  page?: number;
  limit?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: "all" | "active" | "inactive" | "blocked";
  type?: "customer" | "driver" | "admin";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(params: GetUsersParams) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/users?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
