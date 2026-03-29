"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  DEFAULT_PAGE_PERMISSIONS,
  PERMISSIONS,
  PagePermissions,
  Permission,
  SelectedPermissions,
} from "./data";

interface PermissionsTableProps {
  selectedPages: Set<string>;
  pageLabels: Record<string, string>;
  permissions: SelectedPermissions;
  onToggle: (pageId: string, permission: Permission) => void;
}

function PermissionCheckbox({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "group mx-auto flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200",
        value
          ? "bg-[#00A63E] border-[#00A63E]"
          : "bg-white border-[#D1D5DC] hover:border-[#00A63E]",
      )}
    >
      {value && <Check className="w-3 h-3 text-white stroke-[3]" />}
    </button>
  );
}

export function PermissionsTable({
  selectedPages,
  pageLabels,
  permissions,
  onToggle,
}: PermissionsTableProps) {
  if (selectedPages.size === 0) return null;

  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      <Table dir="rtl">
        <TableHeader>
          <TableRow className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <TableHead className="text-right text-[#364153] font-bold h-11 text-sm pr-4">
              الصفحات
            </TableHead>
            {PERMISSIONS.map((p) => (
              <TableHead
                key={p.key}
                className="text-center text-[#364153] font-bold h-11 text-sm"
              >
                {p.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(selectedPages).map((pageId) => {
            const perms: PagePermissions =
              permissions[pageId] ?? DEFAULT_PAGE_PERMISSIONS;
            return (
              <TableRow
                key={pageId}
                className="border-b border-[#F1F5F9] hover:bg-[#F9FAFB] transition-colors"
              >
                <TableCell className="text-right text-[#374151] font-medium text-sm py-3 pr-4">
                  {pageLabels[pageId]}
                </TableCell>
                {PERMISSIONS.map((p) => (
                  <TableCell key={p.key} className="text-center py-3">
                    <div className="flex justify-center">
                      <PermissionCheckbox
                        value={perms[p.key]}
                        onChange={() => onToggle(pageId, p.key)}
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
