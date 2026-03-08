"use client";

import { useMutation } from "@tanstack/react-query";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { sendOtpAction } from "../_actions/auth.actions";

export function useSendOtp() {
  const tCommon = useTranslations("common.toast");

  return useMutation({
    mutationFn: (phone: string) => sendOtpAction(phone),
    onSuccess: () => {
      toast.success(tCommon("otpSent"));
    },
    onError: (error: Error) => {
      toast.error(error.message || tCommon("otpSentError"));
    },
  });
}
