"use client";

import { Ban, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useBlockUser } from "@/src/lib/hooks/use-block-user";
import { usePermissionsStore } from "@/src/store/permissionsStore";

interface BlockToggleButtonProps {
  id: string;
  isBlocked: boolean;
  type: "customer" | "driver" | "admin";
  onSuccess?: () => void;
}

export default function BlockToggleButton({
  id,
  isBlocked,
  type,
  onSuccess,
}: BlockToggleButtonProps) {
  const t = useTranslations("userPage.userActions");
  const tToast = useTranslations("common.toast");

  const { toggleBlock, isPending } = useBlockUser();

  const can = usePermissionsStore((s) => s.can);

  const handleToggleBlock = () => {
    toggleBlock({
      id,
      isBlocked,
      type,
      messages: {
        blockSuccess: tToast("blockSuccess"),
        unblockSuccess: tToast("unblockSuccess"),
        blockError: tToast("blockError"),
      },
      onSuccess,
    });
  };

  if (!can("driver_permission", "PATCH")) return null;

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={handleToggleBlock}
      className={`
        w-full h-12 text-white p-2.5 rounded-xl
        flex items-center justify-center gap-2
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100
        ${
          isBlocked
            ? "bg-green-500 hover:bg-green-600 focus-visible:ring-green-400"
            : "bg-red-500 hover:bg-red-600 focus-visible:ring-red-400"
        }
      `}
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isBlocked ? (
        <>
          <ShieldCheck className="w-5 h-5" />
          {t("unblock")}
        </>
      ) : (
        <>
          <Ban className="w-5 h-5" />
          {t("block")}
        </>
      )}
    </Button>
  );
}
