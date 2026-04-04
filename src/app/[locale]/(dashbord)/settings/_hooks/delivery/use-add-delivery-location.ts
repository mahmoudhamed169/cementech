import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDeliveryLocation,
  AddDeliveryLocationInput,
} from "../../_actions/delivery/add-delivery-location";

export function useAddDeliveryLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddDeliveryLocationInput) => addDeliveryLocation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-locations"] });
    },
  });
}
