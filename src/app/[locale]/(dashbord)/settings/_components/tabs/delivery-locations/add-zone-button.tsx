"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddZoneButtonProps = {
  label: string;
  onClick?: () => void;
};

export default function AddZoneButton({ label, onClick }: AddZoneButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white gap-2"
    >
      <Plus size={16} />
      {label}
    </Button>
  );
}