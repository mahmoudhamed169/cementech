import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  updateDeliveryLocation,
  UpdateDeliveryLocationInput,
} from "../../_actions/delivery/update-delivery-location";

export function useUpdateDeliveryLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateDeliveryLocationInput;
    }) => updateDeliveryLocation(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-locations"] });
      toast.success("تم تحديث المنطقة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث المنطقة");
    },
  });
}
