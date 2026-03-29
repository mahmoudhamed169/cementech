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
import {
  Check,
  CirclePlus,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface Page {
  id: string;
  label: string;
}
interface PageGroup {
  groupId: string;
  groupLabel: string;
  pages: Page[];
}

const PAGE_GROUPS: PageGroup[] = [
  {
    groupId: "general",
    groupLabel: "الصفحات العامة",
    pages: [
      { id: "dashboard", label: "لوحة التحكم" },
      { id: "management", label: "الإدارة" },
    ],
  },
  {
    groupId: "operations",
    groupLabel: "صفحات العمليات",
    pages: [
      { id: "orders", label: "إدارة الطلبات" },
      { id: "drivers", label: "إدارة السائقين" },
      { id: "users", label: "إدارة المستخدمين" },
      { id: "load-requests", label: "طلبات التحميل" },
    ],
  },
  {
    groupId: "finance",
    groupLabel: "صفحات المالية",
    pages: [
      { id: "payments", label: "المدفوعات" },
      { id: "invoices", label: "الفواتير" },
      { id: "financial-reports", label: "التقارير المالية" },
    ],
  },
  {
    groupId: "communication",
    groupLabel: "صفحات التواصل",
    pages: [{ id: "notifications", label: "الإشعارات" }],
  },
  {
    groupId: "settings",
    groupLabel: "الإعدادات",
    pages: [{ id: "system-settings", label: "إعدادات النظام" }],
  },
];

function PageCard({
  page,
  selected,
  onToggle,
}: {
  page: Page;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(page.id)}
      className={cn(
        "group flex items-center justify-between w-full px-4 py-3 rounded-xl border text-right transition-all duration-200 cursor-pointer",
        selected
          ? "bg-[#F0FDF4] border-[#00A63E] shadow-[0_0_0_1px_#00A63E]"
          : "bg-white border-[#E5E7EB] hover:border-[#D1FAE5] hover:bg-[#F9FAFB]",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-200",
          selected ? "text-[#00A63E]" : "text-[#374151]",
        )}
      >
        {page.label}
      </span>
      <span
        className={cn(
          "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200 flex-shrink-0",
          selected
            ? "bg-[#00A63E] border-[#00A63E]"
            : "bg-white border-[#D1D5DC] group-hover:border-[#00A63E]",
        )}
      >
        {selected && <Check className="w-3 h-3 text-white stroke-[3]" />}
      </span>
    </button>
  );
}

function PageGroupSection({
  group,
  selectedPages,
  onToggle,
}: {
  group: PageGroup;
  selectedPages: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const selectedCount = group.pages.filter((p) =>
    selectedPages.has(p.id),
  ).length;
  const allSelected = selectedCount === group.pages.length;

  const toggleAll = () => {
    if (allSelected) {
      group.pages.forEach((p) => selectedPages.has(p.id) && onToggle(p.id));
    } else {
      group.pages.forEach((p) => !selectedPages.has(p.id) && onToggle(p.id));
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#101828] hover:text-[#00A63E] transition-colors"
          >
            {open ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {group.groupLabel}
          </button>
          {selectedCount > 0 && (
            <span className="text-xs bg-[#DCFCE7] text-[#00A63E] font-semibold px-2 py-0.5 rounded-full">
              {selectedCount}/{group.pages.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-[#6B7280] hover:text-[#00A63E] transition-colors underline underline-offset-2"
        >
          {allSelected ? "إلغاء الكل" : "تحديد الكل"}
        </button>
      </div>
      {open && (
        <div className="grid grid-cols-2 gap-2">
          {group.pages.map((page) => (
            <PageCard
              key={page.id}
              page={page}
              selected={selectedPages.has(page.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function RolePermissionsModal() {
  const t = useTranslations("permissionsPage.header");
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());

  const togglePage = (id: string) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
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
      <DialogContent
        className="min-w-5xl bg-white border-0 shadow-2xl rounded-2xl"
        dir="rtl"
      >
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

          {/* Pages */}
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
          <Button
            variant="outline"
            className="rounded-xl border-[#D1D5DC] text-[#374151] hover:bg-[#F9FAFB] px-6"
          >
            إلغاء
          </Button>
          <Button
            disabled={totalSelected === 0}
            className={cn(
              "rounded-xl px-8 transition-all duration-200",
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
