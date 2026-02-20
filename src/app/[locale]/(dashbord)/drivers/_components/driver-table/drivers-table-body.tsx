"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import EmptyTableState from "@/src/components/shared/empty-tablestate";
import DriverStatusBadge from "../driver-status-badge";
import LoadingStatusBadge from "../loading-status-badge";
import DocumentStatusBadge from "../document-status-badge";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { Eye } from "lucide-react";

interface Props {
  drivers: any[];
}

export default function DriversTableBody({ drivers }: Props) {
  const t = useTranslations("driverPage.driversTable.empty");

  if (!drivers || drivers.length === 0) {
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
      {drivers.map((driver, index) => (
        <TableRow
          key={driver.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          <TableCell>{index + 1}</TableCell>
          <TableCell>{driver.id}</TableCell>
          <TableCell>{driver.name}</TableCell>
          <TableCell>{driver.phone}</TableCell>
          <TableCell>
            <DriverStatusBadge status={driver.status} />
          </TableCell>
          <TableCell>
            <LoadingStatusBadge status={driver.loadingStatus} />
          </TableCell>
          <TableCell>
            <DocumentStatusBadge status={driver.documentStatus} />
          </TableCell>
          <TableCell>{driver.ordersCount}</TableCell>
          {/* actions */}
          <TableCell className="text-center">
            <div className="flex items-center justify-center">
              {/* <UserActions user={user} /> */}
              <Link
                href={`/drivers/${driver.id}`}
                className="w-5 h-5 text-[#5E5C5C] cursor-pointer"
              >
                <Eye className="w-5 h-5 text-[#5E5C5C] cursor-pointer hover:text-blue-800" />
              </Link>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
