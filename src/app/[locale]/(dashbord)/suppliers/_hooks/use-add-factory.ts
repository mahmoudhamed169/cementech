"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { addFactoryAction } from "../_actions/factory.actions";
import { FactoryDataFormValues } from "../_schema/factory.schema";

export function useAddFactory(onSuccess?: () => void) {
  const t = useTranslations("suppliersPage");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FactoryDataFormValues) => addFactoryAction(data),
    onSuccess: () => {
      toast.success(t("addFactory.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["factories"] });
      onSuccess?.();
    },
    onError: () => {
      toast.error(t("addFactory.messages.error"));
    },
  });
}
