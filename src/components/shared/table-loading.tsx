import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface Props {
  colSpan: number;
  text?: string;
}

export default function TableLoadingSpinner({
  colSpan,
  text = "جاري تحميل البيانات...",
}: Props) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-40">
          <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">{text}</p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
