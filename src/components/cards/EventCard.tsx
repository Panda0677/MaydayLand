import Link from "next/link";
import { Flame, MapPin } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { ConcertEvent } from "@/types";
import { formatCompactWan, formatEventDate, phaseText } from "@/lib/utils";

type EventCardProps = {
  event: ConcertEvent;
  compact?: boolean;
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const cover = event.coverImage ? (
    <AssetImage
      alt="五月天上海站演唱会视觉"
      className="h-24 bg-white"
      fallbackLabel={`${event.artist} ${event.city}`}
      fallbackTone="concert"
      objectFit="cover"
      objectPosition="center"
      priority={event.id === "mayday-shanghai-20260912"}
      src={event.coverImage}
      sizes="220px"
    >
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand">{phaseText(event.phase)}</span>
    </AssetImage>
  ) : (
    <MediaPlaceholder className="h-24" label={`${event.artist} ${event.city}`} tone="concert">
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand">{phaseText(event.phase)}</span>
    </MediaPlaceholder>
  );

  return (
    <Link className="card block min-w-[220px] overflow-hidden transition active:scale-[0.995]" href={`/events/${event.id}`}>
      {cover}
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-extrabold text-ink">{event.artist}</p>
            <p className="mt-1 truncate text-xs text-muted">{event.tour}</p>
          </div>
          <div className="rounded-xl bg-page px-2 py-1 text-right text-[11px] font-bold text-ink">{formatEventDate(event.datetime)}</div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted">
          <MapPin size={13} />
          <span className="truncate">{event.city} · {event.venue}</span>
        </div>
        {!compact && (
          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Flame size={13} className="text-brand" />
              {formatCompactWan(event.heat)} 人正在关注
            </span>
            <span>{formatCompactWan(event.itemCount)} 件闲置</span>
          </div>
        )}
      </div>
    </Link>
  );
}
