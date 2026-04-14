// matching/_components/matching-table.tsx
import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import MatchingTableHeader from "./matching-table-header";
import { MatchingTableWrapper } from "./matching-table-wrapper";

interface Props {
  search?: string;
  status?: string;
  page?: number;
}

export function MatchingTable({ search, status, page }: Props) {
  return (
    <Table>
      <MatchingTableHeader />
      <Suspense fallback={<MatchingTableSkeleton />}>
        <MatchingTableWrapper search={search} status={status} page={page} />
      </Suspense>
    </Table>
  );
}

function MatchingTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="h-16 border-b border-gray-100">
          {Array.from({ length: 10 }).map((_, j) => (
            <td key={j}>
              <div className="h-4 bg-gray-100 rounded animate-pulse mx-2" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
