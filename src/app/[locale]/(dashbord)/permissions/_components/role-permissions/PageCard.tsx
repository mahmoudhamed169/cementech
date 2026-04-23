"use client";

import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Page, LOCKED_PAGE_IDS } from "./data";

interface PageCardProps {
  page: Page;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function PageCard({ page, selected, onToggle }: PageCardProps) {
  const isLocked = LOCKED_PAGE_IDS.includes(page.id);

  return (
    <button
      type="button"
      onClick={() => !isLocked && onToggle(page.id)}
      disabled={isLocked}
      className={cn(
        "group flex items-center justify-between w-full px-4 py-3 rounded-xl border text-right transition-all duration-200",
        isLocked
          ? "bg-[#F9FAFB] border-[#E5E7EB] cursor-not-allowed opacity-80"
          : selected
            ? "bg-[#F0FDF4] border-[#00A63E] shadow-[0_0_0_1px_#00A63E] cursor-pointer"
            : "bg-white border-[#E5E7EB] hover:border-[#D1FAE5] hover:bg-[#F9FAFB] cursor-pointer",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-200",
          isLocked
            ? "text-[#6B7280]"
            : selected
              ? "text-[#00A63E]"
              : "text-[#374151]",
        )}
      >
        {page.label}
      </span>

      <div className="flex items-center gap-2 flex-shrink-0">
        {isLocked && (
          <span className="flex items-center gap-1 text-xs text-[#6B7280] bg-[#E5E7EB] px-2 py-0.5 rounded-md">
            <Lock className="w-3 h-3" />
            ثابت
          </span>
        )}
        <span
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200",
            isLocked
              ? "bg-[#E5E7EB] border-[#D1D5DC]"
              : selected
                ? "bg-[#00A63E] border-[#00A63E]"
                : "bg-white border-[#D1D5DC] group-hover:border-[#00A63E]",
          )}
        >
          {selected && (
            <Check
              className={cn(
                "w-3 h-3 stroke-[3]",
                isLocked ? "text-[#9CA3AF]" : "text-white",
              )}
            />
          )}
        </span>
      </div>
    </button>
  );
}