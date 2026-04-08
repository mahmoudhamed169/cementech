import { useMutation } from "@tanstack/react-query";
import { createPermissionAction, deletePermissionAction, updatePermissionAction } from "./_actions";
import { CreatePermissionSchema } from "./_schema";
import { toast } from "sonner";

export function useCreatePermission(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: CreatePermissionSchema) => createPermissionAction(data),
    onSuccess: () => {
      toast.success("تم إنشاء الدور بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إنشاء الدور");
    },
  });
}

export function useUpdatePermission(id: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: CreatePermissionSchema) =>
      updatePermissionAction(id, data),
    onSuccess: () => {
      toast.success("تم تحديث الدور بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث الدور");
    },
  });
}

export function useDeletePermission(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (id: string) => deletePermissionAction(id),
    onSuccess: () => {
      toast.success("تم حذف الدور بنجاح");
      onSuccess?.();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الدور");
    },
  });
}
