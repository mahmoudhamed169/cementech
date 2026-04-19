"use client";
import { OrderData } from "@/src/lib/services/orders/spacific-order";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function OrderLogsSection({ order }: { order: OrderData }) {
  const t = useTranslations("orders");
  const logs = order.orderLogs;

  if (!logs || logs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-[#364153] font-bold text-lg">
        {t("orderLogs")}
      </h3>

      <ul className="space-y-6">
        {logs.map((log) => (
          <li key={log.id} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-green-500">
              <CheckCircle size={22} />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[#364153] font-medium text-sm">
                {log.message}
              </span>
              <span className="text-[#9CA3AF] text-xs">
                {new Date(log.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}