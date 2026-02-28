import { Download, FileText } from "lucide-react";
import DocumentStatusBadge from "./document-status-badge";
import { Link } from "@/src/i18n/navigation";

type DocumentStatus = "accepted" | "pending" | "rejected";

interface DriverDocumentItemProps {
  title: string;
  status: DocumentStatus;
  icon?: React.ReactNode;
  link: string; // URL to the document for download
}

export default function DriverDocumentItem({
  title,
  status,
  link,
  icon,
}: DriverDocumentItemProps) {
  return (
    <div className="min-h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-between">
      <div className="flex gap-2.5 items-center px-4 py-3">
        {icon ?? <FileText className="text-[#6B7280]" />}
        <p className="text-sm text-[#0A0A0A]">{title}</p>
      </div>

      <div className="flex gap-4 items-center px-4 py-3 border-[#E5E7EB]">
        <Link href={link} className="text-[#344054] flex items-center gap-1.5">
          <Download size={20} />
        </Link>

        <DocumentStatusBadge status={status} />
      </div>
    </div>
  );
}
