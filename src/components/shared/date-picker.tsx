// src/components/shared/date-picker.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const PRIMARY = "#1946CC";
const PRIMARY_LIGHT = "#EEF2FF";
const PRIMARY_DARK = "#1438A0";

type Step = 1 | 2 | 3;

interface Props {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selYear, setSelYear] = useState<number | null>(null);
  const [selMonth, setSelMonth] = useState<number | null>(null);
  const [selDay, setSelDay] = useState<number | null>(null);
  const now = new Date();

  const reset = () => {
    setStep(1);
    setSelYear(null);
    setSelMonth(null);
    setSelDay(null);
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelMonth(null);
      setSelDay(null);
    }
    if (step === 3) {
      setStep(2);
      setSelDay(null);
    }
  };

  const handleConfirm = () => {
    if (!selYear || selMonth === null || !selDay) return;
    onChange(new Date(selYear, selMonth, selDay));
    setOpen(false);
  };

  const handleClear = () => {
    reset();
    onChange(undefined);
    setOpen(false);
  };

  const selectedLabel = () => {
    if (!selYear) return "—";
    if (selMonth === null) return `${selYear}`;
    if (!selDay) return `${selYear} / ${MONTHS[selMonth]}`;
    return `${selYear} / ${MONTHS[selMonth]} / ${String(selDay).padStart(2, "0")}`;
  };

  const stepLabel = ["Select year", "Select month", "Select day"][step - 1];
  const years = Array.from({ length: 8 }, (_, i) => now.getFullYear() - 4 + i);
  const daysInMonth =
    selYear && selMonth !== null
      ? new Date(selYear, selMonth + 1, 0).getDate()
      : 0;
  const firstDay =
    selYear && selMonth !== null ? new Date(selYear, selMonth, 1).getDay() : 0;

  const itemStyle = (isSelected: boolean, isToday = false) => ({
    fontSize: "13px",
    textAlign: "center" as const,
    padding: "8px 4px",
    borderRadius: "8px",
    border: isSelected
      ? "none"
      : isToday
        ? `1px solid ${PRIMARY}`
        : "1px solid transparent",
    cursor: "pointer",
    background: isSelected ? PRIMARY : "transparent",
    color: isSelected ? "#fff" : isToday ? PRIMARY : "#374151",
    fontWeight: isSelected ? 500 : 400,
    transition: "all 0.15s",
  });

  const onHoverIn = (
    e: React.MouseEvent<HTMLButtonElement>,
    isSelected: boolean,
  ) => {
    if (!isSelected) {
      e.currentTarget.style.background = PRIMARY_LIGHT;
      e.currentTarget.style.color = PRIMARY_DARK;
    }
  };

  const onHoverOut = (
    e: React.MouseEvent<HTMLButtonElement>,
    isSelected: boolean,
    isToday = false,
  ) => {
    if (!isSelected) {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = isToday ? PRIMARY : "#374151";
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="min-h-12 rounded-2xl border-gray-200 bg-white text-sm gap-2 text-gray-600"
        >
          <CalendarIcon className="h-4 w-4 text-gray-400" />
          {value ? format(value, "dd/MM/yyyy") : placeholder}
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="ms-1 rounded-full hover:bg-gray-100 p-0.5"
            >
              <X className="h-3 w-3 text-gray-400" />
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-5 bg-white border border-gray-100 shadow-md rounded-2xl"
        style={{ width: "300px" }}
        align="end"
        side="bottom"
        sideOffset={8}
      >
        {/* Steps bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: "3px",
                borderRadius: "99px",
                background:
                  s === step ? PRIMARY : s < step ? "#93A8E8" : "#E5E7EB",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>
              {stepLabel}
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#1F2937",
                margin: 0,
              }}
            >
              {selectedLabel()}
            </p>
          </div>
          {step > 1 && (
            <button
              onClick={goBack}
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          )}
        </div>

        {/* Step 1 — Years */}
        {step === 1 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "6px",
            }}
          >
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setSelYear(y);
                  setStep(2);
                }}
                style={itemStyle(selYear === y)}
                onMouseEnter={(e) => onHoverIn(e, selYear === y)}
                onMouseLeave={(e) => onHoverOut(e, selYear === y)}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Months */}
        {step === 2 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
            }}
          >
            {MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => {
                  setSelMonth(i);
                  setStep(3);
                }}
                style={itemStyle(selMonth === i)}
                onMouseEnter={(e) => onHoverIn(e, selMonth === i)}
                onMouseLeave={(e) => onHoverOut(e, selMonth === i)}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 — Days */}
        {step === 3 && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
                marginBottom: "4px",
              }}
            >
              {DAYS.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#9CA3AF",
                    fontWeight: 500,
                    padding: "4px 0",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
              }}
            >
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                const isToday =
                  d === now.getDate() &&
                  selMonth === now.getMonth() &&
                  selYear === now.getFullYear();
                const isSelected = selDay === d;
                return (
                  <button
                    key={d}
                    onClick={() => setSelDay(d)}
                    style={{
                      ...itemStyle(isSelected, isToday),
                      padding: "6px 0",
                    }}
                    onMouseEnter={(e) => onHoverIn(e, isSelected)}
                    onMouseLeave={(e) => onHoverOut(e, isSelected, isToday)}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "0.5px solid #F3F4F6",
          }}
        >
          <button
            onClick={handleClear}
            style={{
              fontSize: "12px",
              color: "#9CA3AF",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selDay}
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#fff",
              background: PRIMARY,
              border: "none",
              borderRadius: "8px",
              padding: "7px 16px",
              cursor: selDay ? "pointer" : "not-allowed",
              opacity: selDay ? 1 : 0.4,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (selDay) e.currentTarget.style.background = PRIMARY_DARK;
            }}
            onMouseLeave={(e) => {
              if (selDay) e.currentTarget.style.background = PRIMARY;
            }}
          >
            Confirm
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
