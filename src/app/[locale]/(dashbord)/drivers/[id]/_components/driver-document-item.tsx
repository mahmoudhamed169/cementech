import { Download, FileText } from "lucide-react";
import DocumentStatusBadge from "./document-status-badge";

type DocumentStatus = "approved" | "pending" | "rejected";

interface DriverDocumentItemProps {
  title: string;
  status: DocumentStatus;
  onDownload?: () => void;
  icon?: React.ReactNode;
}

export default function DriverDocumentItem({
  title,
  status,
  onDownload,
  icon,
}: DriverDocumentItemProps) {
  return (
    <div className="min-h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-between">
      <div className="flex gap-2.5 items-center px-4 py-3">
        {icon ?? <FileText className="text-[#6B7280]" />}
        <p className="text-sm text-[#0A0A0A]">{title}</p>
      </div>

      <div className="flex gap-4 items-center px-4 py-3 border-[#E5E7EB]">
        <button onClick={onDownload}>
          <Download size={20} />
        </button>

        <DocumentStatusBadge status={status} />
      </div>
    </div>
  );
}
