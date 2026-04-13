import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSupervisorAction } from "../_actions/supervisors-update-action";
import { SupervisorFormValues } from "../_components/supervisors-form/schema";

interface OriginalValues {
  name: string;
  phone: string;
  permission_id: string;
}

export function useUpdateSupervisor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      original,
    }: {
      id: string;
      data: SupervisorFormValues;
      original: OriginalValues;
    }) => updateSupervisorAction(id, data, original),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supervisors"] });
      toast.success("تم تعديل المشرف بنجاح");
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "حدث خطأ أثناء التعديل");
    },
  });
}
