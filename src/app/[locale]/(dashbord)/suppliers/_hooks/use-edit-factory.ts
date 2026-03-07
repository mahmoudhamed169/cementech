"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { editFactoryAction } from "../_actions/factory.actions";
import { FactoryDataFormValues } from "../_schema/factory.schema";

export function useEditFactory(id: string, onSuccess?: () => void) {
  const t = useTranslations("suppliersPage");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FactoryDataFormValues) =>
      editFactoryAction({ ...data, id }),
    onSuccess: () => {
      toast.success(t("editFactory.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["factories"] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("editFactory.messages.error"));
    },
  });
}
