"use client";

import { useMutation } from "@tanstack/react-query";
import { toggleBlockUser } from "@/src/lib/actions/block-user";
import { toast } from "sonner";

interface BlockUserParams {
  id: string;
  isBlocked: boolean;
  type: "customer" | "driver";
  messages: {
    blockSuccess: string;
    unblockSuccess: string;
    blockError: string;
  };
}

export function useBlockUser() {
  const mutation = useMutation({
    mutationFn: ({ id, isBlocked, type }: BlockUserParams) =>
      toggleBlockUser(id, isBlocked, type),
    onSuccess: (_, { isBlocked, messages }) => {
      toast.success(
        isBlocked ? messages.unblockSuccess : messages.blockSuccess,
      );
    },
    onError: (_, { messages }) => {
      toast.error(messages.blockError);
    },
  });

  return {
    toggleBlock: mutation.mutate,
    isPending: mutation.isPending,
  };
}
