import { Table } from "@/components/ui/table";
import LoadingReqTableHead from "./loading-req-table-head";

export default function LoadingRequestsTable() {
  return (
    <div>
      <Table>
        {/* Header */}
        <LoadingReqTableHead />
      </Table>
    </div>
  );
}
