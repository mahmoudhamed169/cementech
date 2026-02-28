"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

type EmptyTableStateProps = {
  colSpan: number;
  title?: string;
  description?: string;
  icon?: ReactNode;
};

export default function EmptyTableState({
  colSpan,
  title = "لا توجد بيانات",
  description = "لا توجد بيانات متاحة حالياً",
  icon,
}: EmptyTableStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          {icon}
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
