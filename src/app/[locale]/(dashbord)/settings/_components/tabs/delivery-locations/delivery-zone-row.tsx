"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { DeliveryZone } from ".";
import DeleteZoneDialog from "./delete-zone-dialog";
import { useToggleDeliveryLocationStatus } from "../../../_hooks/delivery/use-toggle-delivery-location-status";
import { usePermissionsStore } from "@/src/store/permissionsStore";

type DeliveryZoneRowProps = {
  zone: DeliveryZone;
  editLabel: string;
  onToggle: (value: boolean) => void;
  onEdit: () => void;
  showActions: boolean;
};

export default function DeliveryZoneRow({
  zone,
  editLabel,
  onToggle,
  onEdit,
  showActions,
}: DeliveryZoneRowProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { mutate: toggleStatus, isPending } = useToggleDeliveryLocationStatus();

  const can = usePermissionsStore((s) => s.can);
  const canEdit = can("setting_permission", "PATCH");
  const canDelete = can("setting_permission", "DELETE");

  const handleToggle = (value: boolean) => {
    toggleStatus({ id: zone.id, is_active: value });
    onToggle(value);
  };

  return (
    <>
      <div
        className={`grid ${showActions ? "grid-cols-4" : "grid-cols-3"} items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-800">
            {zone.name_ar}
          </span>
          <span className="text-xs text-gray-400">{zone.name_en}</span>
        </div>

        <span className="text-sm text-gray-600 text-center">
          {zone.radius} كم
        </span>

        {/* Toggle */}
        <div className="flex justify-center">
          <div
            className={`relative ${isPending || !canEdit ? "cursor-not-allowed" : "cursor-pointer"}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Tooltip */}
            {canEdit && (
              <div
                className={`
                  absolute -top-9 left-1/2 -translate-x-1/2
                  px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap
                  shadow-md transition-all duration-200 pointer-events-none z-10
                  ${hovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0"}
                  ${
                    zone.enabled
                      ? "bg-red-50 text-red-500 border border-red-100"
                      : "bg-green-50 text-green-600 border border-green-100"
                  }
                `}
              >
                {zone.enabled ? "إيقاف المنطقة" : "تفعيل المنطقة"}
                <div
                  className={`
                    absolute top-full left-1/2 -translate-x-1/2
                    border-4 border-transparent
                    ${zone.enabled ? "border-t-red-100" : "border-t-green-100"}
                  `}
                />
              </div>
            )}

            {/* Switch wrapper */}
            <div
              className={`
                p-1.5 rounded-xl transition-all duration-200
                ${isPending || !canEdit ? "cursor-not-allowed" : "cursor-pointer"}
                ${
                  hovered && canEdit
                    ? zone.enabled
                      ? "bg-red-50"
                      : "bg-green-50"
                    : "bg-transparent"
                }
              `}
            >
              <Switch
                checked={zone.enabled}
                onCheckedChange={handleToggle}
                disabled={isPending || !canEdit}
                className={`
                  transition-all duration-200
                  ${isPending || !canEdit ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                  ${hovered && !isPending && canEdit ? "scale-105" : "scale-100"}
                `}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex justify-end items-center gap-3">
            {canEdit && (
              <button
                onClick={onEdit}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                {editLabel}
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => setDeleteOpen(true)}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Trash2 size={14} />
                حذف
              </button>
            )}
          </div>
        )}
      </div>

      <DeleteZoneDialog
        id={zone.id}
        nameAr={zone.name_ar}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  );
}
