"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

type SaveButtonProps = {
  label: string;
  onClick: () => void;
};

export default function SaveButton({ label, onClick }: SaveButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white gap-2"
    >
      <Save size={16} />
      {label}
    </Button>
  );
}
