"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CirclePlus, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageGroupSection } from "./PageGroupSection";
import { PermissionsTable } from "./PermissionsTable";
import {
  PAGE_GROUPS,
  DEFAULT_PAGE_PERMISSIONS,
  Permission,
  SelectedPermissions,
} from "./data";

// map: pageId -> label — لازم نعمله مرة واحدة بره الكومبوننت
const PAGE_LABELS: Record<string, string> = Object.fromEntries(
  PAGE_GROUPS.flatMap((g) => g.pages.map((p) => [p.id, p.label])),
);

export function RolePermissionsModal() {
  const t = useTranslations("permissionsPage.header");
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [permissions, setPermissions] = useState<SelectedPermissions>({});

  const togglePage = (id: string) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // ابدأ بـ default permissions لما الصفحة تتضاف
        setPermissions((p) => ({
          ...p,
          [id]: p[id] ?? { ...DEFAULT_PAGE_PERMISSIONS },
        }));
      }
      return next;
    });
  };

  const togglePermission = (pageId: string, permission: Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [pageId]: {
        ...(prev[pageId] ?? DEFAULT_PAGE_PERMISSIONS),
        [permission]: !(prev[pageId] ?? DEFAULT_PAGE_PERMISSIONS)[permission],
      },
    }));
  };

  const totalSelected = selectedPages.size;
  const totalPages = PAGE_GROUPS.reduce((acc, g) => acc + g.pages.length, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="min-w-46 min-h-12 rounded-xl bg-[#00A63E] text-white p-3 flex justify-center items-center gap-2">
          <CirclePlus />
          {t("addBtn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-5xl bg-white border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="border-b border-[#F3F4F6] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#DCFCE7]">
              <Shield className="w-5 h-5 text-[#00A63E]" />
            </div>
            <div>
              <DialogTitle className="text-[#101828] text-lg font-bold">
                إنشاء دور جديد
              </DialogTitle>
              <p className="text-xs text-[#6B7280] mt-0.5">
                حدد الصلاحيات المناسبة لهذا الدور
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-1 py-2 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                اسم الدور <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="مثل: مدير مبيعات"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                الوصف
              </label>
              <Input
                placeholder="وصف مختصر للدور"
                className={cn(
                  "py-2.5 px-4 rounded-xl w-full transition-all duration-200 border border-[#D1D5DC] text-right",
                  "focus-visible:ring-0 focus-visible:border-[#00A63E] focus-visible:shadow-[0_0_0_3px_rgba(0,166,62,0.12)]",
                )}
              />
            </div>
          </div>

          {/* Page Selector */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-semibold text-[#101828]">
                حدد الصفحات التي يمكن الوصول إليها
              </h5>
              <span className="text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-lg">
                {totalSelected} / {totalPages} صفحة
              </span>
            </div>
            {PAGE_GROUPS.map((group) => (
              <PageGroupSection
                key={group.groupId}
                group={group}
                selectedPages={selectedPages}
                onToggle={togglePage}
              />
            ))}
          </div>

          {/* Permissions Table */}
          {totalSelected > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-[#101828] mb-3">
                تفاصيل الصلاحيات
              </h5>
              <PermissionsTable
                selectedPages={selectedPages}
                pageLabels={PAGE_LABELS}
                permissions={permissions}
                onToggle={togglePermission}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#F3F4F6]">
          <Button
            disabled={totalSelected === 0}
            className={cn(
              "rounded-xl px-8 transition-all duration-200 flex-1",
              totalSelected > 0
                ? "bg-[#00A63E] hover:bg-[#008F35] text-white shadow-sm"
                : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed",
            )}
          >
            إنشاء الدور
            {totalSelected > 0 && (
              <span className="mr-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-md">
                {totalSelected}
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border-[#D1D5DC] text-[#374151] hover:bg-[#F9FAFB] px-6 flex-1"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
