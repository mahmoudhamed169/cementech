"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  acceptDocumentsAction,
  rejectDocumentsAction,
} from "../_actions/verify-documents-action";

export function useVerifyDocuments(driverId: string) {
  const queryClient = useQueryClient();
  const t = useTranslations("driverPage.driverDocuments.verifyDocuments");

  const invalidateDriver = () => {
    queryClient.invalidateQueries({ queryKey: ["driver", driverId] });
  };

  const acceptMutation = useMutation({
    mutationFn: () => acceptDocumentsAction(driverId),
    onSuccess: () => {
      toast.success(t("acceptSuccess"));
      invalidateDriver();
    },
    onError: () => {
      toast.error(t("acceptError"));
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectDocumentsAction(driverId),
    onSuccess: () => {
      toast.success(t("rejectSuccess"));
      invalidateDriver();
    },
    onError: () => {
      toast.error(t("rejectError"));
    },
  });

  return {
    acceptDocuments: acceptMutation.mutate,
    rejectDocuments: rejectMutation.mutate,
    isAccepting: acceptMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
}
