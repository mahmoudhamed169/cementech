// payments/_lib/api.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface InvoiceStats {
  totalCommission: number;
  earnedFee: number;
  bankMoney: number;
  driversMoney: number;
}

export async function getInvoiceStats(): Promise<InvoiceStats> {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${API_URL}/orders/invoice-report/stats`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      systemscreen: "payment_permission",
    },
    next: { tags: ["invoice-stats"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoice stats: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
