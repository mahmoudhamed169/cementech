import { cn } from "@/lib/utils";

type LoadingRequestStatus =
  | "received"
  | "approved"
  | "factory_arrival"
  | "loading"
  | "loaded"
  | "rejected"
  | "pending_payment";

const arabicToEnglish: Record<string, LoadingRequestStatus> = {
  "تم استقبال": "received",
  "تمت الموافقة": "approved",
  "تم الوصول للمصنع": "factory_arrival",
  "جاري التحميل": "loading",
  "تم التحميل": "loaded",
  مرفوض: "rejected",
  "في انتظار الدفع": "pending_payment",
};

type StatusStyle = { bg: string; text: string };

const loadingRequestStatusStyles: Record<LoadingRequestStatus, StatusStyle> = {
  received: { bg: "bg-blue-100", text: "text-blue-800" },
  approved: { bg: "bg-green-100", text: "text-green-800" },
  factory_arrival: { bg: "bg-purple-100", text: "text-purple-800" },
  loading: { bg: "bg-yellow-100", text: "text-yellow-800" },
  loaded: { bg: "bg-emerald-100", text: "text-emerald-800" },
  rejected: { bg: "bg-red-100", text: "text-red-700" },
  pending_payment: { bg: "bg-orange-100", text: "text-orange-800" },
};

function normalizeStatus(status: string): LoadingRequestStatus {
  return (arabicToEnglish[status] ?? status) as LoadingRequestStatus;
}

interface LoadingRequestStatusBadgeProps {
  status: string;
}

export function LoadingRequestStatusBadge({
  status,
}: LoadingRequestStatusBadgeProps) {
  const normalized = normalizeStatus(status);
  const styles = loadingRequestStatusStyles[normalized];

  if (!styles) return <span>{status}</span>;

  return (
    <span
      className={cn(
        "h-7 px-3 rounded-full text-sm font-medium",
        "inline-flex items-center justify-center whitespace-nowrap",
        styles.bg,
        styles.text,
      )}
    >
      {status}
    </span>
  );
}
