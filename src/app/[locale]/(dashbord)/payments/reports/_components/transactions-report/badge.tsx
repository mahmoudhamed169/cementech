import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  cls: string;
}

export function Badge({ label, cls }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset whitespace-nowrap",
        cls,
      )}
    >
      {label}
    </span>
  );
}
