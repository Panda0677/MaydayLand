import { ImageIcon, Music2, Package, Shirt } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MediaTone = "concert" | "glowstick" | "shirt" | "bag" | "poster" | "card" | "community" | "default";

type MediaPlaceholderProps = {
  label: string;
  tone?: MediaTone;
  className?: string;
  children?: ReactNode;
};

const toneClass: Record<MediaTone, string> = {
  concert: "bg-[radial-gradient(circle_at_24%_24%,rgba(255,255,255,.7)_0_14%,transparent_15%),linear-gradient(135deg,#2b211d,#ff7a21)] text-white",
  glowstick: "bg-[radial-gradient(circle_at_50%_32%,#fff7ed_0_15%,transparent_16%),linear-gradient(145deg,#ffe0c4,#ff8a34)] text-brand",
  shirt: "bg-[linear-gradient(135deg,#ffe6d3,#f97316)] text-white",
  bag: "bg-[linear-gradient(135deg,#f8fafc,#fdba74)] text-brand",
  poster: "bg-[linear-gradient(135deg,#e5e7eb,#f97316)] text-white",
  card: "bg-[linear-gradient(135deg,#fff7ed,#dbeafe)] text-brand",
  community: "bg-[linear-gradient(135deg,#fff7ed,#f8fafc)] text-brand",
  default: "bg-orange-50 text-brand",
};

const iconMap: Record<MediaTone, typeof ImageIcon> = {
  concert: Music2,
  glowstick: Package,
  shirt: Shirt,
  bag: Package,
  poster: ImageIcon,
  card: ImageIcon,
  community: Music2,
  default: ImageIcon,
};

export function MediaPlaceholder({ label, tone = "default", className, children }: MediaPlaceholderProps) {
  const Icon = iconMap[tone];

  return (
    <div className={cn("relative grid place-items-center overflow-hidden", toneClass[tone], className)}>
      <div className="grid place-items-center gap-2 text-center">
        <Icon size={24} strokeWidth={2.1} />
        <span className="max-w-[88%] text-xs font-black leading-4">{label}</span>
      </div>
      {children}
    </div>
  );
}
