import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAd } from "../../_actions/ads/add-ad";

export function useAddAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => addAd(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      toast.success("تم إضافة الإعلان بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الإعلان");
    },
  });
}