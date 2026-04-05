"use client";
import { TableBody } from "@/components/ui/table";
import EmptyTableState from "@/src/components/shared/empty-tablestate";
import { useTranslations } from "next-intl";

export default function EmptyFactories() {
  const t = useTranslations("suppliersPage.table.empty");
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
