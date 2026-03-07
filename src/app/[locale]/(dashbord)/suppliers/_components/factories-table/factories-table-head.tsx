"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function FactoriesTableHead() {
  const headers = [
    "index",
    "factoryNumber",
    "factoryName",
    "contactInfo",
    "region",
    "productsCount",
    "status",
    "actions",
  ] as const;

  const t = useTranslations("suppliersPage.table.columns");

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
