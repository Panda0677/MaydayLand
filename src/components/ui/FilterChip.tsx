import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterChipProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export function FilterChip({ children, active = false, onClick }: FilterChipProps) {
  return (
    <button className={cn("chip shrink-0", active && "chip-active")} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
