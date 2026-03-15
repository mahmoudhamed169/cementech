"use client ";
import { CircleCheckBig, Clock, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";

type DocumentStatus = "accepted" | "approved" | "pending" | "rejected";

interface Props {
  status: DocumentStatus;
}

export default function DocumentStatusBadge({ status }: Props) {
  const t = useTranslations("driverPage.documentStatus");

  const config = {
    accepted: {
      color: "text-green-600",
      dot: "bg-green-600",
      icon: <CircleCheckBig size={15} />,
    },
    approved: {
      color: "text-green-600",
      dot: "bg-green-600",
      icon: <CircleCheckBig size={15} />,
    },
    pending: {
      color: "text-yellow-600",
      dot: "bg-yellow-600",
      icon: <Clock size={15} />,
    },
    rejected: {
      color: "text-red-600",
      dot: "bg-red-600",
      icon: <CircleX size={15} />,
    },
  }[status];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
      <div className={`flex gap-1.5 items-center ${config.color}`}>
        <p className="text-sm">{t(status)}</p>
        {config.icon}
      </div>
    </div>
  );
}
