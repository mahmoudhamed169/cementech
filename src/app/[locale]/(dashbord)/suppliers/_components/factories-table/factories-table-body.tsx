import { Factory } from "@/src/lib/types/factories/factory";
import EmptyLoadingRequests from "../../../loadingRequests/_components/loading-requests-table/empty-loading-requests";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import StatusBadge from "./status-badge";
import { DeleteFactoryDialog } from "./delete-factory-dialog";
import EditFactoryWrapper from "./edit-factory-wrapper";

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
          <TableCell>{factory.code}</TableCell>
          <TableCell>{factory.name}</TableCell>
          <TableCell>
            {factory.contact_number ? factory.contact_number : "-"}
          </TableCell>
          <TableCell>{factory.location ? factory.location : "-"}</TableCell>
          <TableCell>{factory.productsCount}</TableCell>
          <TableCell>
            <StatusBadge isActive={factory.is_active} />
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center gap-2">
              <EditFactoryWrapper id={factory.id} />
              <DeleteFactoryDialog
                factoryId={factory.id}
                factoryName={factory.name}
              />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
