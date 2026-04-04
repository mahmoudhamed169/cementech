"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

type SaveButtonProps = {
  label: string;
  isPending: boolean;
  disabled: boolean;
};

export default function SaveButton({
  label,
  isPending,
  disabled,
}: SaveButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="bg-green-600 hover:bg-green-700 text-white gap-2 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Save size={16} />
      )}
      {label}
    </Button>
  );
}
