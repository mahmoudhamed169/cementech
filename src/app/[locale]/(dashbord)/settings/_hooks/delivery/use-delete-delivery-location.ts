import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { deleteDeliveryLocation } from "../../_actions/delivery/delete-delivery-location";

export function useDeleteDeliveryLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDeliveryLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-locations"] });
      toast.success("تم حذف المنطقة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف المنطقة");
    },
  });
}
