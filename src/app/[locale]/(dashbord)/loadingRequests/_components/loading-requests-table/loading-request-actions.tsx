"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigation";
import { Eye, AlertCircle } from "lucide-react";
import { Request } from "@/src/lib/types/requests/request";
import ApproveRequestModal from "../../[id]/_components/approve-request-modal";
import { usePermissionsStore } from "@/src/store/permissionsStore";

interface Props {
  request: Request;
}

export default function LoadingRequestActions({ request }: Props) {
  const [open, setOpen] = useState(false);
  const can = usePermissionsStore((s) => s.can);

  const isReceived =
    request.request_status === "received" ||
    request.request_status === "تم استقبال";

  // يظهر الزرار بس لو عنده POST أو PATCH
  const canApprove = can("loading_request_permission", "POST");
  const canReject = can("loading_request_permission", "PATCH");
  const showModal = canApprove || canReject;

  return (
    <div className="flex items-center justify-center gap-2 w-16">
      <div className="w-5 h-5 flex items-center justify-center">
        {/* علامة الموديل بتظهر بس لو عنده أي صلاحية */}
        {isReceived && showModal && (
          <>
            <button onClick={() => setOpen(true)}>
              <AlertCircle className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700" />
            </button>
            <ApproveRequestModal
              request={request}
              open={open}
              onClose={() => setOpen(false)}
              canApprove={canApprove}
              canReject={canReject}
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
