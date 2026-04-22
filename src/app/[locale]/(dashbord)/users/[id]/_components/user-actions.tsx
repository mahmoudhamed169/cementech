"use client";
import { CustomerProfileData } from "@/src/lib/services/users/user-profile";

import SendNotification from "@/src/components/common/send-notification";
import BlockToggleButton from "@/src/components/common/block-boggle-button";

export default function UserActions({ user }: { user: CustomerProfileData }) {
  return (
    <div className="flex justify-around w-full gap-4 px-12 py-5 border-t border-[#E5E7EB]">
      <div className="w-1/2">
        <BlockToggleButton
          id={user.user_id}
          isBlocked={user.status === "blocked"}
          type="customer"
        />
      </div>

      <div className="w-1/2">
        <SendNotification
          recipientId={user.user_id}
          recipientName={user.customer_name}
          recipientType="customer"
        />
      </div>
    </div>
  );
}
