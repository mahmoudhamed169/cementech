"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Permission } from "@/src/lib/services/permissions/get-permissions";
import { permissionPagesMap } from "@/src/lib/services/permissions/permission-pages-map";
import { CircleCheck, CircleX } from "lucide-react";

import { useTranslations } from "next-intl";

const headers = ["الصفحات", "معاينة", "إنشاء", "تعديل", "حذف"];

const Cell = ({ value }: { value: boolean }) =>
  value ? (
    <CircleCheck size={20} className="mx-auto text-[#00A63E]" />
  ) : (
    <CircleX size={20} className="mx-auto text-[#FB2C36]" />
  );

export default function TableRoles({ permission }: { permission: Permission }) {
  const t = useTranslations("sidebar");

  const rows = Object.entries(permissionPagesMap)
    .map(([key, translationKey]) => {
      const methods = permission[key as keyof Permission] as string[];
      return {
        page: t(translationKey),
        preview: methods.includes("GET"),
        create: methods.includes("POST"),
        edit: methods.includes("PATCH"),
        delete: methods.includes("DELETE"),
      };
    })
    .filter((row) => row.preview || row.create || row.edit || row.delete); // ← هنا
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          {headers.map((h) => (
            <TableHead
              key={h}
              className="text-center text-[#364153] font-bold h-11 text-sm"
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            className="border-b border-[#F1F5F9] hover:bg-[#F9FAFB] transition-colors"
          >
            <TableCell className="text-center text-[#374151] font-medium text-sm py-3">
              {row.page}
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.preview} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.create} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.edit} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.delete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
