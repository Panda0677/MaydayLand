import { notFound } from "next/navigation";
import { Timer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { getLiveListing, liveDistanceText, liveListingPriceText } from "@/data/liveListings";
import { formatEventShortDate } from "@/lib/utils";

type LiveRentalPageProps = {
  params: { id: string };
};

export default function LiveRentalPage({ params }: LiveRentalPageProps) {
  const listing = getLiveListing(params.id);
  if (!listing || listing.type !== "rental") notFound();

  const event = getEvent(listing.eventId);
  if (!event) notFound();

  return (
    <AppShell hideBottomNav>
      <TopHeader title="现场租赁" showBack />
      <div className="space-y-4 p-4">
        <section className="card p-4">
          <AssetImage
            alt="五月天荧光棒"
            className="mb-4 h-32 rounded-2xl bg-white"
            fallbackLabel="荧光棒"
            fallbackTone="glowstick"
            objectFit="contain"
            priority
            src={listing.imagePath}
          />
          <div className="flex items-center gap-2 text-xs font-black text-brand">
            <Timer size={15} />
            租赁
          </div>
          <h1 className="mt-3 text-xl font-black text-ink">{listing.title}</h1>
          <p className="mt-2 text-2xl font-black text-brand">{liveListingPriceText(listing)}</p>
          <dl className="mt-4 grid grid-cols-[92px_1fr] gap-y-3 text-sm">
            <dt className="text-muted">距离</dt>
            <dd className="text-right font-bold text-ink">{liveDistanceText(listing.distanceMeters)}</dd>
            <dt className="text-muted">公共面交点</dt>
            <dd className="text-right font-bold text-ink">{listing.meetupPoint}</dd>
            <dt className="text-muted">可取</dt>
            <dd className="text-right font-bold text-ink">{listing.availableUntil}</dd>
          </dl>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">Event</h2>
          <p className="mt-3 text-sm font-black text-ink">
            {event.artist}【{event.tour}】{event.city}站
          </p>
          <p className="mt-1 text-xs font-semibold text-muted">
            {formatEventShortDate(event.datetime)} · {event.venue}
          </p>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">说明</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{listing.description}</p>
        </section>

        <SecondaryButton className="w-full" href={`/events/${event.id}/live`}>
          返回现场模式
        </SecondaryButton>
      </div>
    </AppShell>
  );
}
