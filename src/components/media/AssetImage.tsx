"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { cn } from "@/lib/utils";

type AssetImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fallbackLabel: string;
  fallbackTone?: "concert" | "glowstick" | "shirt" | "bag" | "poster" | "card" | "community" | "default";
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
};

export function AssetImage({
  src,
  alt,
  className,
  imageClassName,
  fallbackLabel,
  fallbackTone = "default",
  objectFit = "cover",
  objectPosition = "center",
  priority,
  sizes = "(max-width: 390px) 100vw, 390px",
  children,
}: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <MediaPlaceholder className={className} label={fallbackLabel} tone={fallbackTone}>
        {children}
      </MediaPlaceholder>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        alt={alt}
        className={cn("select-none", imageClassName)}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
        style={{ objectFit, objectPosition }}
        onError={() => setFailed(true)}
      />
      {children}
    </div>
  );
}
