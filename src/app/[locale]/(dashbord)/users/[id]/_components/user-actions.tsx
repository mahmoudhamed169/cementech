import React from "react";
import { SendUserNotification } from "../../_components/send-user-notification";
import { Ban } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UserActions() {
  return (
    <div className="flex justify-around w-full gap-4 px-12 py-5 border-t border-[#E5E7EB]">
      {/* Ban User */}
      <Button
        variant="outline"
        className="
      w-1/2 h-12 bg-red-500 text-white p-2.5 rounded-xl
      flex items-center justify-center gap-2
      transition-all duration-200
      hover:bg-red-600 hover:shadow-lg hover:scale-[1.02]
      active:scale-[0.98]
      focus-visible:ring-2 focus-visible:ring-red-400
    "
      >
        <Ban className="w-5 h-5" />
        حظر المستخدم
      </Button>

      {/* Send Notification */}
      <div className="w-1/2">
        <SendUserNotification />
      </div>
    </div>
  );
}
