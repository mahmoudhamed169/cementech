import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { FactoriesResponse } from "../../types/factories/factory";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GetFactoriesParams {
  lang: "ar" | "en";
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
}

export async function getFactories({
  lang,
  page,
  limit,
  search,
  is_active,
}: GetFactoriesParams): Promise<FactoriesResponse> {
  const session = await getServerSession(authOptions);

  const query = new URLSearchParams();
  if (page !== undefined) query.append("page", String(page));
  if (limit !== undefined) query.append("limit", String(limit));
  if (search) query.append("search", search);
  if (is_active !== undefined) query.append("is_active", String(is_active));

  const res = await fetch(`${API_URL}/factories?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "factories_permission",
      lang,
    },
    next: { tags: ["factories"] },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch factories");
  }

  return res.json() as Promise<FactoriesResponse>;
}
