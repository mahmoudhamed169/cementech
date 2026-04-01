// matching/_components/matching-table.tsx
import { Table } from "@/components/ui/table";
import MatchingTableHeader from "./matching-table-header";
import { MatchingTableWrapper } from "./matching-table-wrapper";

export function MatchingTable() {
  return (
    <Table>
      <MatchingTableHeader />
      <MatchingTableWrapper />
    </Table>
  );
}
