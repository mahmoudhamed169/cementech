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
import { Permission } from "@/src/lib/services/permissions/get-permissions";
import { useTranslations } from "next-intl";

export function RoleDetails({
  title,
  description,
  permission,
}: {
  title: string;
  description: string;
  permission: Permission;
}) {
  const t = useTranslations("permissionsPage.roleDetails");

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#155DFC] text-white text-sm font-semibold hover:bg-[#1446C4] transition-all hover:scale-[1.01] cursor-pointer">
            <Eye size={15} /> {t("btn")}
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-188.25 bg-white border-0 max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-[#101828] font-bold text-2xl">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="border-t border-[#E5E7EB] mt-6 flex flex-col flex-1 overflow-hidden">
            <h2 className="text-[#101828] font-bold text-xl py-6">
              {t("permissionsList")}
            </h2>
            <div className="overflow-y-auto flex-1 pb-6">
              <TableRoles permission={permission} />
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
