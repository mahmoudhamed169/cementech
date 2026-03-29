import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // أو أي toast library عندك
import { assignDriverAction } from "../actions/assign-driver";

export const useAssignDriver = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (driverIds: string[]) => assignDriverAction(orderId, driverIds),
    onSuccess: () => {
      toast.success("تم تعيين السائق بنجاح");
      queryClient.invalidateQueries({ queryKey: ["nearby-drivers"] });
    },
    onError: () => {
      toast.error("فشل تعيين السائق، حاول مرة أخرى");
    },
  });
};
