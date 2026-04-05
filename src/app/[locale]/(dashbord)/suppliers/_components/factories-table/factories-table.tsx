import React, { Suspense } from "react";
import FactoriesTableHead from "./factories-table-head";
import { Table } from "@/components/ui/table";
import TableLoadingSpinner from "@/src/components/shared/table-loading";
import FacotoriesTableWrapper from "./facotories-table-wrapper";

interface Props {
  page: number;
  limit: number;
  search: string;
  is_active?: boolean;
}

export default function FactoriesTable({
  page,
  limit,
  search,
  is_active,
}: Props) {
  return (
    <Table>
      <FactoriesTableHead />
      <Suspense
        key={`${page}-${search}-${is_active}`}
        fallback={<TableLoadingSpinner colSpan={9} />}
      >
        <FacotoriesTableWrapper
          page={page}
          limit={limit}
          search={search}
          is_active={is_active}
        />
      </Suspense>
    </Table>
  );
}
