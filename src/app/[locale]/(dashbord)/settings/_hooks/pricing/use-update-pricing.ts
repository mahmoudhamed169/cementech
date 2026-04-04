import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePricingInput } from "@/src/lib/types/settings/pricing/pricing";
import { toast } from "sonner";
import { updatePricing } from "../../_actions/pricing/update-pricing";

export function useUpdatePricing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePricingInput) => updatePricing(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("تم حفظ إعدادات التسعير بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حفظ إعدادات التسعير");
    },
  });
}