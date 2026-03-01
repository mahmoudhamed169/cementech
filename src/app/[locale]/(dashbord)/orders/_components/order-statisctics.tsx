import { getOrderStats } from "@/src/lib/services/orders/order-stats";
import OrdersStatisticsClient from "./orders-statistics-client";

export default async function OrdersStatistics() {
  const stats = await getOrderStats({ lang: "en" });
  const arabicToEnglish: Record<string, string> = {
    "تم التسليم": "delivered",
    ملغي: "canceled",
    "قيد التجهيز": "in_preparation",
    "تحت المراجعة": "under_review",
    "قيد التوصيل": "delivery",
  };

  const statusMap: Record<string, number> = stats.data.statuses.reduce(
    (acc, s) => {
      const key = arabicToEnglish[s.status] ?? s.status;
      acc[key] = s.totalOrders;
      return acc;
    },
    {} as Record<string, number>,
  );
  const statistics = [
    { key: "total", value: stats.data.total },
    { key: "delivered", value: statusMap["delivered"] ?? 0 },
    { key: "in_preparation", value: statusMap["in_preparation"] ?? 0 },
    { key: "under_review", value: statusMap["under_review"] ?? 0 },
    { key: "delivery", value: statusMap["delivery"] ?? 0 },
    { key: "canceled", value: statusMap["canceled"] ?? 0 },
  ];

  return <OrdersStatisticsClient statistics={statistics} />;
}
