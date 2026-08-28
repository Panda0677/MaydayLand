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
  glowstick: "bg-[#fff4ec] text-brand",
  shirt: "bg-[#fff1e7] text-brand",
  bag: "bg-[#f7eee6] text-brand",
  poster: "bg-[#f2eee9] text-brand",
  card: "bg-[#fff4ec] text-brand",
  community: "bg-[linear-gradient(135deg,#fff7ed,#f8fafc)] text-brand",
  default: "bg-[#f7eee6] text-brand",
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
    <div className={cn("relative aspect-square grid place-items-center overflow-hidden", toneClass[tone], className)}>
      <div className="grid max-w-full place-items-center gap-2 px-3 text-center">
        <Icon size={24} strokeWidth={2.1} />
        <span className="max-w-full whitespace-nowrap text-xs font-bold leading-4 text-current">{label}</span>
      </div>
      {children}
    </div>
  );
}
