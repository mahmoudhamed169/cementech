"use client";

import { DriverProfile } from "@/src/lib/types/driver";
import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyDocuments } from "../_hooks/use-verify-documents";
import { Button } from "@/components/ui/button";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function DocumentVerifyActions({
  driver,
}: {
  driver: DriverProfile;
}) {
  const t = useTranslations("driverPage.driverDocuments.verifyDocuments");
  const { acceptDocuments, rejectDocuments, isAccepting, isRejecting } =
    useVerifyDocuments(driver.user_id);

  const can = usePermissionsStore((s) => s.can);
  if (!can("driver_permission", "PATCH")) return null;

  return (
    <div className="flex w-full gap-3 px-4 py-5 border-t border-[#E5E7EB]">
      <Button
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        onClick={() => acceptDocuments()}
        disabled={isAccepting || isRejecting}
      >
        {isAccepting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        <span>{t("accept")}</span>
      </Button>

      <Button
        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        onClick={() => rejectDocuments()}
        disabled={isAccepting || isRejecting}
      >
        {isRejecting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        <span>{t("reject")}</span>
      </Button>
    </div>
  );
}
