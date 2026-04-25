"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PageCard } from "./PageCard";
import { PageGroup } from "./data";
import { useTranslations } from "next-intl";

interface PageGroupSectionProps {
  group: PageGroup;
  selectedPages: Set<string>;
  onToggle: (id: string) => void;
}

export function PageGroupSection({
  group,
  selectedPages,
  onToggle,
}: PageGroupSectionProps) {
  const t = useTranslations("permissionsPage.modal");
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
          {allSelected ? t("deselectAll") : t("selectAll")}
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