"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { acceptRequestAction } from "../_actions/accept-request.action";

interface AcceptRequestData {
  request_type: "with_data" | "without_data";
  trip_certificate?: File;
  laying_command?: File;
}

export function useAcceptRequest(requestId: string, onSuccess?: () => void) {
  const t = useTranslations("loadingRequestsPage");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AcceptRequestData) =>
      acceptRequestAction(requestId, data),
    onSuccess: () => {
      toast.success(t("approveModal.stepTwo.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requestId", requestId] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("approveModal.stepTwo.messages.error"));
    },
  });
}
