"use client";

import { Switch } from "@/components/ui/switch";
import { DeliveryZone } from ".";

type DeliveryZoneRowProps = {
  zone: DeliveryZone;
  editLabel: string;
  onToggle: (value: boolean) => void;
  onEdit: () => void;
};

export default function DeliveryZoneRow({
  zone,
  editLabel,
  onToggle,
  onEdit,
}: DeliveryZoneRowProps) {
  return (
    <div className="grid grid-cols-4 items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <span className="text-sm font-medium text-gray-800">{zone.name}</span>
      <span className="text-sm text-gray-600 text-center">{zone.radius} كم</span>
      <div className="flex justify-center">
        <Switch checked={zone.enabled} onCheckedChange={onToggle} />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          {editLabel}
        </button>
      </div>
    </div>
  );
}