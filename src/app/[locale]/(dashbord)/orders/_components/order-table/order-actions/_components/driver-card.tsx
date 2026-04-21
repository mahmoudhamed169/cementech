"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Loader2, X, Phone as PhoneIcon } from "lucide-react";
import { Driver } from "@/src/lib/services/orders/spacific-order";
import { useUnassignDriver } from "../../../../[id]/_hooks/use-unassign-driver";
import Image from "next/image";

interface DriverCardProps {
  driver: Driver;
  orderId: string;
  suffix: string;
  isCanceled: boolean;
  status: { label: string; className: string };
}

const theme: Record<string, { bg: string; text: string; dot: string; accent: string }> = {
  ACCEPTED:  { bg: "bg-emerald-50/60", text: "text-emerald-700", dot: "bg-emerald-500", accent: "#22c55e" },
  PENDING:   { bg: "bg-amber-50/60",   text: "text-amber-700",   dot: "bg-amber-500",   accent: "#f59e0b" },
  REJECTED:  { bg: "bg-red-50/60",     text: "text-red-700",     dot: "bg-red-500",     accent: "#ef4444" },
  DELIVERED: { bg: "bg-blue-50/60",    text: "text-blue-700",    dot: "bg-blue-500",    accent: "#3b82f6" },
};
const fallback = { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400", accent: "#d1d5db" };

function initials(name: string) {
  return name ? name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() : "?";
}

export default function DriverCard({ driver, orderId, suffix, isCanceled, status }: DriverCardProps) {
  const t = useTranslations("orderActions");
  const { mutate: unassign, isPending } = useUnassignDriver(orderId);
  const s = theme[driver.status] ?? fallback;
  const avatar = (driver as any).avatar_url;
  const showUnassign = driver.status !== "DELIVERED" && !isCanceled;

  return (
    <div className="flex rounded-xl border border-gray-100 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow min-w-[220px]">
      <div className="w-1 shrink-0" style={{ background: s.accent }} />

      <div className="flex-1 px-4 py-5 flex flex-col justify-between gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            {avatar ? (
              <Image src={avatar} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
            ) : (
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold ${s.bg} ${s.text}`}>
                {initials(driver.driver_name)}
              </div>
            )}
            <span className={`absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-white ${s.dot}`} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-gray-900 truncate">{driver.driver_name || "—"}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{t("driver")}{suffix}</p>
          </div>

          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text} flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Phone */}
        <a
          href={driver.phone ? `tel:${driver.phone}` : undefined}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <PhoneIcon size={14} className="text-gray-300" />
          <span className="text-[13px] font-medium tabular-nums" dir="ltr">{driver.phone || "—"}</span>
        </a>

        {/* Unassign */}
        {showUnassign && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-full text-[12px] font-medium text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 gap-1.5 rounded-lg border border-red-100 transition-all"
            disabled={isPending}
            onClick={() => unassign(driver.driver_id)}
          >
            {isPending ? <Loader2 size={13} className="animate-spin" /> : <><X size={13} strokeWidth={2.5} />{t("unassignDriver")}</>}
          </Button>
        )}
      </div>
    </div>
  );
}
