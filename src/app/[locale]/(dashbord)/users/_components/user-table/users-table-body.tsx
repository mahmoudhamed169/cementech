"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import EmptyTableState from "@/src/components/shared/empty-tablestate";

import { useTranslations } from "next-intl";
import { UserStatusBadge } from "../user-status-badge";
import { getTotalPaid } from "@/src/lib/utils/utils";
import { CurrencyIcon } from "@/src/components/shared/currency-icon";
import { UserActions } from "../user-actions";

interface Props {
  users: any[];
}

export default function UsersTableBody({ users }: Props) {
  const t = useTranslations("userPage.usersTable.empty");

  if (!users || users.length === 0) {
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
    <TableBody>
      {users.map((user, index) => (
        <TableRow
          key={user.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          {/* index */}
          <TableCell className="text-center">{index + 1}</TableCell>

          {/* user id */}
          <TableCell className="text-center font-medium">#{user.id}</TableCell>
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

          {/* lastLogin */}
          <TableCell className="text-center">{user.lastLogin ? user.lastLogin.toLocaleDateString() : "-"}</TableCell>

          {/* actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center">
              <UserActions user={user} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
