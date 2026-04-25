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
import { Check, Lock } from "lucide-react";
import {
  DEFAULT_PAGE_PERMISSIONS,
  LOCKED_PAGES,
  LOCKED_FIXED_PERMISSIONS,
  LOCKED_HIDDEN_PERMISSIONS,
  PERMISSIONS,
  PagePermissions,
  Permission,
  SelectedPermissions,
} from "./data";
import { useTranslations } from "next-intl";

interface PermissionsTableProps {
  selectedPages: Set<string>;
  pageLabels: Record<string, string>;
  permissions: SelectedPermissions;
  onToggle: (pageId: string, permission: Permission) => void;
}

function PermissionCheckbox({
  value,
  onChange,
  disabled = false,
}: {
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "group mx-auto flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200",
        disabled
          ? "cursor-not-allowed border-[#D1D5DC] bg-[#F3F4F6]"
          : value
            ? "bg-[#00A63E] border-[#00A63E] cursor-pointer"
            : "bg-white border-[#D1D5DC] hover:border-[#00A63E] cursor-pointer",
      )}
    >
      {value && (
        <Check
          className={cn(
            "w-3 h-3 stroke-[3]",
            disabled ? "text-[#9CA3AF]" : "text-white",
          )}
        />
      )}
    </button>
  );
}

export function PermissionsTable({
  selectedPages,
  pageLabels,
  permissions,
  onToggle,
}: PermissionsTableProps) {
  const t = useTranslations("permissionsPage");

  if (selectedPages.size === 0) return null;

  return (
    <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
      <Table dir="rtl">
        <TableHeader>
          <TableRow className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <TableHead className="text-right text-[#364153] font-bold h-11 text-sm pr-4 align-middle">
              {t("permissionsTable.pages")}
            </TableHead>
            {PERMISSIONS.map((p) => (
              <TableHead
                key={p.key}
                className="text-center text-[#364153] font-bold h-11 text-sm align-middle"
              >
                {t(`data.permissions.${p.key}`)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(selectedPages).map((pageId) => {
            const perms: PagePermissions =
              permissions[pageId] ?? DEFAULT_PAGE_PERMISSIONS;
            const isLockedPage = !!LOCKED_PAGES[pageId];

            return (
              <TableRow
                key={pageId}
                className={cn(
                  "border-b border-[#F1F5F9] transition-colors",
                  isLockedPage ? "bg-[#F9FAFB]" : "hover:bg-[#F9FAFB]",
                )}
              >
                <TableCell className="text-right text-[#374151] font-medium text-sm py-3 pr-4 align-middle">
                  <div className="flex items-center gap-2 justify-start">
                    {isLockedPage && (
                      <span className="flex items-center gap-1 text-xs text-[#6B7280] bg-[#E5E7EB] px-2 py-0.5 rounded-md">
                        <Lock className="w-3 h-3" />
                        {t("permissionsTable.fixed")}
                      </span>
                    )}
                    {pageLabels[pageId]}
                  </div>
                </TableCell>
                {PERMISSIONS.map((p) => {
                  const isCellFixed =
                    isLockedPage &&
                    LOCKED_FIXED_PERMISSIONS[pageId]?.includes(p.key);

                  const isHidden =
                    isLockedPage &&
                    LOCKED_HIDDEN_PERMISSIONS[pageId]?.includes(p.key);

                  return (
                    <TableCell
                      key={p.key}
                      className="text-center py-3 align-middle"
                    >
                      <div className="flex justify-center items-center">
                        {isHidden ? (
                          <div className="w-5 h-5 rounded-md border-2 border-[#D1D5DC] bg-[#F3F4F6] cursor-not-allowed" />
                        ) : (
                          <PermissionCheckbox
                            value={perms[p.key]}
                            onChange={() =>
                              !isCellFixed && onToggle(pageId, p.key)
                            }
                            disabled={!!isCellFixed}
                          />
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
