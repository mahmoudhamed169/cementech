import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function OrdersTableEmpty() {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={10} className="text-center py-16">
          <p className="font-bold text-[#101828] text-base">لا توجد طلبات</p>
          <p className="text-sm text-[#475467] mt-1">
            ستظهر الطلبات هنا بمجرد إنشائها
          </p>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
