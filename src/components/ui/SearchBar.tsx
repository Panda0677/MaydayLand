"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value = "", onChange, placeholder = "搜索演唱会、艺人、物品" }: SearchBarProps) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm text-muted shadow-soft focus-within:border-brand focus-within:bg-brand-soft">
      <Search size={17} strokeWidth={2.2} />
      <input
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        suppressHydrationWarning
      />
    </label>
  );
}
