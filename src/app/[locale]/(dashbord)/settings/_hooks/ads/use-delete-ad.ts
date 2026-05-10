import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAd } from "../../_actions/ads/delete-ad";

export function useDeleteAd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAd(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      toast.success("تم حذف الإعلان بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الإعلان");
    },
  });
}
