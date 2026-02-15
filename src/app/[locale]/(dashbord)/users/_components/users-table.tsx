"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyUsers, User } from "@/src/lib/constants/user";
import { useTranslations } from "next-intl";
import { UserStatusBadge } from "./user-status-badge";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { UserActions } from "./user-actions";
import { getTotalPaid } from "@/src/lib/utils/utils";

export default function UsersTable() {
  const headers = [
    "index",
    "userId",
    "userName",
    "organizationName",
    "phoneNumber",
    "status",
    "ordersCount",
    "documentStatus",
    "totalPaid",
    "actions",
  ] as const;
  const t = useTranslations("userPage.usersTable.columns");

  return (
    <Table>
      {/* Header */}
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

      {/* Body */}
      <TableBody>
        {dummyUsers.map((user, index) => (
          <TableRow
            key={user.id}
            className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
          >
            {/* index */}
            <TableCell className="text-center">{index + 1}</TableCell>

            {/* user id */}
            <TableCell className="text-center font-medium">
              #{user.id}
            </TableCell>
            {/* userName */}
            <TableCell className="text-center font-medium">
              {user.userName}
            </TableCell>

            {/* organizationName */}
            <TableCell className="text-center font-medium">
              {user.organizationName ?? "-"}
            </TableCell>

            {/* phoneNumber */}
            <TableCell className="text-center font-medium">
              {user.phoneNumber}
            </TableCell>

            {/* status */}
            <TableCell className="text-center">
              <UserStatusBadge status={user.status} />
            </TableCell>

            {/* order count */}
            <TableCell className="text-center">{user.orders.length}</TableCell>

            {/* totalPaid */}
            <TableCell className="text-center flex items-center justify-center gap-1 mt-3">
              <span>{getTotalPaid(user)}</span>
              <CurrencyIcon />
            </TableCell>

            {/* actions */}
            <TableCell className="text-center">
              <div className="flex items-center justify-center">
                <UserActions user={user} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
