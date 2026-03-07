"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteFactoryAction } from "../_actions/factory.actions";

export function useDeleteFactory(onSuccess?: () => void) {
  const t = useTranslations("suppliersPage");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFactoryAction(id),
    onSuccess: () => {
      toast.success(t("deleteFactory.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["factories"] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("deleteFactory.messages.error"));
    },
  });
}
