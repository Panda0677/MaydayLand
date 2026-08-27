"use client";

import { MapPin } from "lucide-react";
import { meetupPoints } from "@/data/checkout";
import { cn } from "@/lib/utils";

type MeetupPointSelectorProps = {
  value: string;
  onSelect: (value: string) => void;
};

export function MeetupPointSelector({ value, onSelect }: MeetupPointSelectorProps) {
  return (
    <div className="grid gap-2">
      {meetupPoints.map((point) => (
        <button
          className={cn(
            "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
            value === point && "border-brand bg-orange-50 text-brand",
          )}
          type="button"
          key={point}
          onClick={() => onSelect(point)}
        >
          <MapPin size={17} />
          <span>{point}</span>
        </button>
      ))}
    </div>
  );
}
