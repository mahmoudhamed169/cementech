"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function UserTableHeader() {
  const headers = [
    "index",
    "userId",
    "userName",
    "organizationName",
    "phoneNumber",
    "status",
    "ordersCount",
    "totalPaid",
    "actions",
  ] as const;

  const t = useTranslations("userPage.usersTable.columns");
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
