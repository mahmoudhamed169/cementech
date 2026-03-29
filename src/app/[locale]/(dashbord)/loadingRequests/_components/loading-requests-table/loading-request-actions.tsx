"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigation";
import { Eye, ClipboardCheck, BadgeCheck, AlertCircle } from "lucide-react";
import { Request } from "@/src/lib/types/requests/request";
import ApproveRequestModal from "../../[id]/_components/approve-request-modal";

interface Props {
  request: Request;
}

export default function LoadingRequestActions({ request }: Props) {
  const [open, setOpen] = useState(false);

  const isReceived =
    request.request_status === "received" ||
    request.request_status === "تم استقبال";

  return (
    <div className="flex items-center justify-center gap-2 w-16">
      <div className="w-5 h-5 flex items-center justify-center">
        {isReceived && (
          <>
            <button onClick={() => setOpen(true)}>
              <AlertCircle className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" />
            </button>
            <ApproveRequestModal
              request={request}
              open={open}
              onClose={() => setOpen(false)}
            />
          </>
        )}
      </div>
      <div className="w-5 h-5 flex items-center justify-center">
        <Link href={`/loadingRequests/${request.id}`}>
          <Eye className="w-5 h-5 text-[#5E5C5C] cursor-pointer hover:text-blue-800" />
        </Link>
      </div>
    </div>
  );
}
