import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";
import { FactoriesResponse } from "../../types/factories/factory";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFactories(
  lang: "ar" | "en",
): Promise<FactoriesResponse> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/factories`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      system_screen: "factories_permissions",
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
