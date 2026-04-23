"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Eye, UserRoundPen } from "lucide-react";
import { useState } from "react";

import SupervisorsStatusBadge from "./supervisors-status-badge";
import { useLocale, useTranslations } from "next-intl";
import EmptyTableState from "@/src/components/shared/empty-tablestate";
import { ApiSupervisor } from "@/src/lib/types/admin/admin";
import SupervisorsViewDialog from "./supervisors-view-dialog";
import SupervisorsDialog from "../supervisors-form/supervisors-dialog";
import { usePermissionsStore } from "@/src/store/permissionsStore";

interface Props {
  data: ApiSupervisor[];
  page: number;
  limit: number;
}

function formatDateOnly(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTimeOnly(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatAgo(dateStr: string, locale: string) {
  return formatDistanceToNow(new Date(dateStr), {
    addSuffix: true,
    locale: locale === "ar" ? ar : enUS,
  });
}

export default function SupervisorsTableBody({ data, page, limit }: Props) {
  const t = useTranslations("supervisorsPage.empty");
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ApiSupervisor | null>(null);
  const [editSupervisor, setEditSupervisor] = useState<ApiSupervisor | null>(
    null,
  );

  const can = usePermissionsStore((s) => s.can);

  if (!data.length) {
    return (
      <TableBody>
        <EmptyTableState
          colSpan={9}
          title={t("title")}
          description={t("description")}
        />
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {data.map((supervisor, index) => (
          <TableRow
            key={supervisor.id}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            <TableCell>{(page - 1) * limit + index + 1}</TableCell>

            <TableCell>
              <p className="font-medium text-[#101828]">{supervisor.name}</p>
              <p className="text-xs text-[#6A7282]">{supervisor.code}</p>
            </TableCell>

            <TableCell>
              <p className="text-[#101828]">{supervisor.phone}</p>
            </TableCell>

            <TableCell>
              <SupervisorsStatusBadge status={supervisor.status} />
            </TableCell>

            <TableCell>
              <Badge className="bg-[#DBEAFE] text-[#193CB8] hover:bg-[#DBEAFE] rounded-md px-3 py-1 text-xs font-medium">
                {supervisor.permissions?.name ?? "-"}
              </Badge>
            </TableCell>

            <TableCell>
              <p className="text-[#101828] text-sm">
                {formatDateOnly(supervisor.created_at)}
              </p>
              <p className="text-[#6A7282] text-xs">
                {formatTimeOnly(supervisor.created_at)}
              </p>
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-center gap-1">
                {can("management_permission", "PATCH") && (
                  <button
                    onClick={() => setEditSupervisor(supervisor)}
                    className="p-2 rounded-lg hover:bg-[#DBEAFE] text-[#6A7282] hover:text-[#193CB8] transition-colors"
                  >
                    <UserRoundPen size={16} />
                  </button>
                )}
                <button
                  onClick={() => setSelectedSupervisor(supervisor)}
                  className="p-2 rounded-lg hover:bg-[#DBEAFE] text-[#6A7282] hover:text-[#193CB8] transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {selectedSupervisor && (
        <SupervisorsViewDialog
          open={!!selectedSupervisor}
          onClose={() => setSelectedSupervisor(null)}
          supervisor={selectedSupervisor}
        />
      )}

      {editSupervisor && (
        <SupervisorsDialog
          open={!!editSupervisor}
          onClose={() => setEditSupervisor(null)}
          supervisor={editSupervisor}
        />
      )}
    </>
  );
}
