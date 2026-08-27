"use client";

import { Clock3 } from "lucide-react";
import { timeSlots } from "@/data/checkout";
import { cn } from "@/lib/utils";

type TimeSlotSelectorProps = {
  value: string;
  onSelect: (value: string) => void;
};

export function TimeSlotSelector({ value, onSelect }: TimeSlotSelectorProps) {
  return (
    <div className="grid gap-2">
      {timeSlots.map((slot) => (
        <button
          className={cn(
            "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
            value === slot && "border-brand bg-orange-50 text-brand",
          )}
          type="button"
          key={slot}
          onClick={() => onSelect(slot)}
        >
          <Clock3 size={17} />
          <span>{slot}</span>
        </button>
      ))}
    </div>
  );
}
