import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Request } from "@/src/lib/types/requests/request";
import EmptyLoadingRequests from "./empty-loading-requests";
import TimeAgo from "@/src/components/providers/shared/_components/time-ago";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { LoadingRequestStatusBadge } from "../../../_components/loading-qequest-status-badge";

interface Props {
  loadingRequests: Request[];
}

export default function LoadingRequestsTableBody({ loadingRequests }: Props) {
  if (!loadingRequests || loadingRequests.length === 0) {
    return <EmptyLoadingRequests />;
  }

  return (
    <TableBody>
      {loadingRequests.map((loading, index) => (
        <TableRow
          key={loading.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          <TableCell>{index + 1}</TableCell>
          <TableCell>{loading.code}</TableCell>

          {/* اسم السائق */}
          <TableCell>{loading.driver_name}</TableCell>

          {/* رقم اللوحة */}
          <TableCell>{loading.car_plates}</TableCell>

          {/* حالة الطلب */}
          <TableCell>
            {/* {loading.request_status} */}
            <LoadingRequestStatusBadge status={loading.request_status} />
          </TableCell>

          {/* الكمية */}
          <TableCell>{loading.quantity}</TableCell>

          {/* وقت الطلب */}
          <TableCell>
            <TimeAgo time={loading.created_at} />
          </TableCell>

          {/* ميعاد التحميل */}
          <TableCell>
            {loading.loaded_at ? <TimeAgo time={loading.loaded_at} /> : "-"}
          </TableCell>

          {/* actions */}
          <TableCell>-</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
