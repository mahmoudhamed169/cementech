import { FactoriesResponse } from "../../types/factories/factory";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFactories(
  lang: "ar" | "en",
): Promise<FactoriesResponse> {
  const res = await fetch(`${API_URL}/factories`, {
    headers: {
      Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
      system_screen: "dashboard_factories",
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
