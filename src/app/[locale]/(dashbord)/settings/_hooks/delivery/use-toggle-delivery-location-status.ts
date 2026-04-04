import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleDeliveryLocationStatus } from "../../_actions/delivery/toggle-delivery-location-status";

export function useToggleDeliveryLocationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_active }: { id: string; is_active: boolean }) =>
      toggleDeliveryLocationStatus(id, is_active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-locations"] });
      toast.success("تم تحديث حالة المنطقة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث الحالة");
    },
  });
}
