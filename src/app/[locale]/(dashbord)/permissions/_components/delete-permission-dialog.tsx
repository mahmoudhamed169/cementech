"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, TriangleAlert } from "lucide-react";
import { useDeletePermission } from "./role-permissions/_hooks";
import { useTranslations } from "next-intl";

interface DeletePermissionDialogProps {
  permissionId: string;
  permissionName: string;
}

export function DeletePermissionDialog({
  permissionId,
  permissionName,
}: DeletePermissionDialogProps) {
  const t = useTranslations("permissionsPage.deleteDialog");
  const { mutate: deletePermission, isPending } = useDeletePermission();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF1F2] border border-[#FFE4E6] text-[#F43F5E]">
          <Trash2 size={14} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent
        style={{ fontFamily: "Tajawal, sans-serif" }}
        className="max-w-sm rounded-2xl p-0 overflow-hidden shadow-xl border-0 bg-white"
      >
        <div className="bg-white px-8 pt-8 pb-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <TriangleAlert className="w-8 h-8 text-red-500" />
          </div>
          <AlertDialogHeader className="space-y-2 items-center">
            <AlertDialogTitle className="text-xl font-bold text-gray-900 text-center">
              {t("title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 text-center leading-relaxed">
              {t.rich("description", {
                name: permissionName,
                span: (chunks) => (
                  <span className="font-semibold text-gray-700">{chunks}</span>
                ),
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="px-8 py-5 bg-white flex gap-3 flex-row-reverse sm:flex-row-reverse !border-t-0">
          <AlertDialogAction
            onClick={() => deletePermission(permissionId)}
            disabled={isPending}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-11 font-semibold transition-colors shadow-sm"
          >
            {isPending ? t("deleting") : t("confirm")}
          </AlertDialogAction>
          <AlertDialogCancel
            disabled={isPending}
            className="flex-1 rounded-xl h-11 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            {t("cancel")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
