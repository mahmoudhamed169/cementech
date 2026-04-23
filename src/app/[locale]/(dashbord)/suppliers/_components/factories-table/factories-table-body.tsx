"use client";
import { Factory } from "@/src/lib/types/factories/factory";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import StatusBadge from "./status-badge";
import { DeleteFactoryDialog } from "./delete-factory-dialog";
import EmptyFactories from "./empty-factories";
import { usePermissionsStore } from "@/src/store/permissionsStore";

interface Props {
  factories: Factory[];
  editActions?: Record<string, React.ReactNode>; // ← changed from function to map
}

export default function FactoriesTableBody({ factories, editActions }: Props) {
  const can = usePermissionsStore((s) => s.can);
  const canEdit = can("supplier_permission", "PATCH");
  const canDelete = can("supplier_permission", "DELETE");
  const showActions = canEdit || canDelete;

  if (!factories || factories.length === 0) {
    return <EmptyFactories />;
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
          {showActions && (
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                {canEdit && editActions?.[factory.id]} {/* ← lookup by id */}
                {canDelete && (
                  <DeleteFactoryDialog
                    factoryId={factory.id}
                    factoryName={factory.name}
                  />
                )}
              </div>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}
