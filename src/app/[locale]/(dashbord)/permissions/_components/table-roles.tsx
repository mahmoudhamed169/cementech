import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, CircleX } from "lucide-react";

const headers = ["الصفحات", "معاينة", "إنشاء", "تعديل", "حذف"];

const rows = [
  {
    page: "لوحة التحكم",
    preview: true,
    create: true,
    edit: false,
    delete: false,
  },
  { page: "المستخدمون", preview: true, create: true, edit: true, delete: true },
  {
    page: "التقارير",
    preview: true,
    create: false,
    edit: false,
    delete: false,
  },
  { page: "الإعدادات", preview: true, create: true, edit: true, delete: true },
  { page: "المحتوى", preview: true, create: true, edit: true, delete: false },
];

const Cell = ({ value }: { value: boolean }) =>
  value ? (
    <CircleCheck size={20} className="mx-auto text-[#00A63E]" />
  ) : (
    <CircleX size={20} className="mx-auto text-[#FB2C36]" />
  );

export default function TableRoles() {
  return (
    <Table dir="rtl" className="mt-4">
      <TableHeader>
        <TableRow className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          {headers.map((h) => (
            <TableHead
              key={h}
              className="text-center text-[#364153] font-bold h-11 text-sm"
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            className="border-b border-[#F1F5F9] hover:bg-[#F9FAFB] transition-colors"
          >
            <TableCell className="text-center text-[#374151] font-medium text-sm py-3">
              {row.page}
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.preview} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.create} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.edit} />
            </TableCell>
            <TableCell className="text-center py-3">
              <Cell value={row.delete} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
