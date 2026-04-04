"use client";

import { useState } from "react";
import { Download, FileText, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DocumentStatusBadge from "./document-status-badge";
import { useTranslations } from "next-intl";

export type DocumentStatus = "accepted" | "approved" | "pending" | "rejected";

interface DriverDocumentItemProps {
  title: string;
  status: DocumentStatus;
  icon?: React.ReactNode;
  link: string;
}

export default function DriverDocumentItem({
  title,
  status,
  link,
  icon,
}: DriverDocumentItemProps) {
  const t = useTranslations("driverPage.driverDocuments");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleDownload = async () => {
    const res = await fetch(link);
    const blob = await res.blob();

    // بياخد الامتداد من الـ URL مباشرة
    const ext = link.split(".").pop()?.split("?")[0] || "jpg";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="min-h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-between">
        <div className="flex gap-2.5 items-center px-4 py-3">
          {icon ?? <FileText className="text-[#6B7280]" />}
          <p className="text-sm text-[#0A0A0A]">{title}</p>
        </div>

        <div className="flex gap-4 items-center px-4 py-3">
          {/* Eye — فتح الصورة في modal */}
          <button
            onClick={() => setPreviewOpen(true)}
            className="text-[#344054] hover:text-blue-500 transition-colors"
            title={t("preview")}
          >
            <Eye size={20} />
          </button>

          {/* Download — تنزيل الصورة */}
          <button
            onClick={handleDownload}
            className="text-[#344054] hover:text-green-500 transition-colors"
            title={t("download")}
          >
            <Download size={20} />
          </button>

          <DocumentStatusBadge status={status} />
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-white border-0 max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800 text-start">
              {title}
            </DialogTitle>
          </DialogHeader>

          <div className="rounded-xl overflow-hidden border border-gray-100">
            <img
              src={link}
              alt={title}
              className="w-full h-auto object-contain max-h-[70vh]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
