import { useMutation } from "@tanstack/react-query";
import { cancelOrderAction } from "../_actions/cancel-order.action";

export function useCancelOrder() {
  return useMutation({
    mutationFn: (id: string) => cancelOrderAction(id),
  });
}
