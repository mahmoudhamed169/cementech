import { Factory } from "@/src/lib/types/factories/factory";
import EmptyLoadingRequests from "../../../loadingRequests/_components/loading-requests-table/empty-loading-requests";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import StatusBadge from "./status-badge";

interface Props {
  factories: Factory[];
}

export default function FactoriesTableBody({ factories }: Props) {
  if (!factories || factories.length === 0) {
    return <EmptyLoadingRequests />;
  }

  return (
    <TableBody>
      {factories.map((factory, index) => (
        <TableRow
          key={factory.id}
          className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-muted/40 h-14 text-center"
        >
          <TableCell>{index + 1}</TableCell>

          {/* رقم المصنع */}
          <TableCell>{factory.code}</TableCell>

          {/* اسم المصنع  */}
          <TableCell>{factory.name}</TableCell>

          {/*  التواصل */}
          <TableCell>
            {factory.contact_number ? factory.contact_number : "-"}
          </TableCell>

          {/* المنطقة */}
          <TableCell>{factory.location ? factory.location : "-"}</TableCell>

          {/* عدد المنتجات */}
          <TableCell>{factory.products.length}</TableCell>

          {/* حالة الطلب */}
          <TableCell>
            {/* {factory.is_active ? "نشط" : "غير نشط"}
             */}

            <StatusBadge isActive={factory.is_active} />
          </TableCell>

          {/* actions */}
          <TableCell>-</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
