import BlockToggleButton from "@/src/components/common/block-boggle-button";
import SendNotification from "@/src/components/common/send-notification";
import DocumentVerifyActions from "./document-verify-actions";
import { DriverProfile } from "@/src/lib/types/driver";
import React from "react";

export default function DriverActions({ driver }: { driver: DriverProfile }) {
  const isPending = driver.document_verify === "pending";

  if (isPending) {
    return <DocumentVerifyActions driver={driver} />;
  }

  return (
    <div className="flex justify-around w-full gap-4 px-12 py-5 border-t border-[#E5E7EB]">
      <div className="w-1/2">
        <BlockToggleButton
          id={driver.user_id}
          isBlocked={driver.driver_status === "blocked"}
          type="driver"
        />
      </div>

      <div className="w-1/2">
        <SendNotification
          recipientId={driver.user_id}
          recipientName={driver.driver_name}
          recipientType="driver"
        />
      </div>
    </div>
  );
}
