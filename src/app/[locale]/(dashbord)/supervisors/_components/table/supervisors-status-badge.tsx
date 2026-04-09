"use client";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

type SupervisorStatus = "active" | "inactive" | "blocked";

const statusConfig: Record<SupervisorStatus, { className: string }> = {
  active: {
    className: "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]",
  },
  inactive: {
    className: "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FEE2E2]",
  },
  blocked: {
    className: "bg-[#FEF9C3] text-[#CA8A04] hover:bg-[#FEF9C3]",
  },
};

interface Props {
  status: SupervisorStatus;
}

export default function SupervisorsStatusBadge({ status }: Props) {
  const t = useTranslations("supervisorsPage.status");
  const config = statusConfig[status];

  return <Badge className={config.className}>{t(status)}</Badge>;
}
