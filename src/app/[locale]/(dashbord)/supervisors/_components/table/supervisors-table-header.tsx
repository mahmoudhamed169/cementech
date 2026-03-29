"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

const headers = [
  "index", // الرقم
  "name", // اسم المشرف
  "contact", // التواصل
  "status", // الحالة
  "management", // الإدارة
  "lastLogin", // آخر دخول
  "actions", // الإجراءات
] as const;

export default function SupervisorsTableHeader() {
  const t = useTranslations("supervisorsPage.table.columns");

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
