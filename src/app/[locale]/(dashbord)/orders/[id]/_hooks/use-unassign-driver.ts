import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { unassignDriverAction } from "../_actions/unassign-driver-action";

export function useUnassignDriver(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (driverId: string) => unassignDriverAction(orderId, driverId),
    onSuccess: () => {
      toast.success("تم إلغاء التخصيص بنجاح");
      queryClient.invalidateQueries({ queryKey: ["ordersId", orderId] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}