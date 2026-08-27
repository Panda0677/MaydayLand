"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

type BottomSheetProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function BottomSheet({ open, title, children, onClose }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
      <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[24px] bg-white p-4 shadow-soft">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-black text-ink">{title}</h2>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-page text-ink" type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
