import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye } from "lucide-react";
import TableRoles from "./table-roles";

export function RoleDetails({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#155DFC] text-white text-sm font-semibold hover:bg-[#1446C4] transition-all hover:scale-[1.01] cursor-pointer">
            <Eye size={15} /> رؤية التفاصيل
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-188.25 bg-white border-0 ">
          <DialogHeader>
            <DialogTitle className="text-[#101828] font-bold text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="border-t border-[#E5E7EB] mt-6 py-6">
            <h2 className="text-[#101828] font-bold text-xl">قايمة الأذونات</h2>

            {/* table roles */}
            <TableRoles />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
