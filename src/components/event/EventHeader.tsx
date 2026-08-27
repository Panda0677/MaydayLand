import { CalendarClock, MapPin } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { ConcertEvent } from "@/types";
import { formatCompactWan, formatEventFullDate } from "@/lib/utils";

type EventHeaderProps = {
  event: ConcertEvent;
};

export function EventHeader({ event }: EventHeaderProps) {
  return (
    <section className="card overflow-hidden">
      {event.coverImage ? (
        <AssetImage
          alt="五月天上海站演唱会视觉"
          className="h-40 bg-white"
          fallbackLabel={`${event.artist} ${event.city}站`}
          fallbackTone="concert"
          objectFit="cover"
          objectPosition="center"
          priority
          src={event.coverImage}
        />
      ) : (
        <MediaPlaceholder className="h-40" label={`${event.artist} ${event.city}站`} tone="concert" />
      )}
      <div className="p-4">
        <h1 className="page-title">
          {event.artist}【{event.tour}】{event.city}站
        </h1>
        <div className="mt-3 grid gap-2 text-sm text-muted">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-brand" />
            {event.venue}
          </p>
          <p className="flex items-center gap-2">
            <CalendarClock size={16} className="text-brand" />
            {formatEventFullDate(event.datetime)}
          </p>
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">
          {formatCompactWan(event.attendeeCount ?? event.heat)} 人关注 · {formatCompactWan(event.itemCount)} 件闲置
        </p>
      </div>
    </section>
  );
}
