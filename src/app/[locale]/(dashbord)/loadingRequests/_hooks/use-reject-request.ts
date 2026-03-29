import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { rejectRequest } from "../_actions/reject-request";

export function useRejectRequest() {
  const t = useTranslations("loadingRequestsPage.approveModal");

  const { mutate, isPending } = useMutation({
    mutationFn: (requestId: string) => rejectRequest(requestId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(t("rejectSuccess"));
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error(t("rejectError"));
    },
  });

  return { rejectRequest: mutate, isPending };
}
