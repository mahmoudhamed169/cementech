// src/components/shared/pending-driver-eye.tsx
"use client";

import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PendingDriverEye() {
  const t = useTranslations("pendingDriver");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-not-allowed">
            <Eye className="w-5 h-5 text-gray-300" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("tooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
