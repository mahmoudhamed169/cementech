"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { usePermissionsStore } from "@/src/store/permissionsStore";

export default function FactoriesTableHead() {
  const t = useTranslations("suppliersPage.table.columns");
  const can = usePermissionsStore((s) => s.can);

  const canEdit = can("supplier_permission", "PATCH");
  const canDelete = can("supplier_permission", "DELETE");
  const showActions = canEdit || canDelete;

  const headers = [
    "index",
    "factoryNumber",
    "factoryName",
    "contactInfo",
    "region",
    "productsCount",
    "status",
    ...(showActions ? ["actions"] : []),
  ] as const;

  return (
    <TableHeader>
      <TableRow>
        {headers.map((key) => (
          <TableHead
            key={key}
            className="text-center text-[#364153] font-bold h-11"
          >
            {t(key)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
