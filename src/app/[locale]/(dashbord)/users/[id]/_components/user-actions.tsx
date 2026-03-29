"use client";
import { SendUserNotification } from "../../_components/send-user-notification";
import { Ban, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { CustomerProfileData } from "@/src/lib/services/users/user-profile";
import { useBlockUser } from "@/src/lib/hooks/use-block-user";

export default function UserActions({ user }: { user: CustomerProfileData }) {
  const t = useTranslations("userPage.userActions");
  const tToast = useTranslations("common.toast");
  const isBlocked = user.status === "blocked";
  const { toggleBlock, isPending } = useBlockUser();

  const handleToggleBlock = () => {
    toggleBlock({
      id: user.user_id, // ✅ بدل user.user_id
      isBlocked,
      type: "customer",
      messages: {
        blockSuccess: tToast("blockSuccess"),
        unblockSuccess: tToast("unblockSuccess"),
        blockError: tToast("blockError"),
      },
    });
  };

  return (
    <div className="flex justify-around w-full gap-4 px-12 py-5 border-t border-[#E5E7EB]">
      {/* Ban / Unban User */}
      <Button
        variant="outline"
        disabled={isPending}
        onClick={handleToggleBlock}
        className={`
          w-1/2 h-12 text-white p-2.5 rounded-xl
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

      {/* Send Notification */}
      <div className="w-1/2">
        <SendUserNotification />
      </div>
    </div>
  );
}
