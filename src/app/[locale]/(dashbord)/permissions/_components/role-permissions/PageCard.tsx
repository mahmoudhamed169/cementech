"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Page } from "./data";

interface PageCardProps {
  page: Page;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function PageCard({ page, selected, onToggle }: PageCardProps) {
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
