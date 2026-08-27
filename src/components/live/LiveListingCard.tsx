import Link from "next/link";
import { ArrowRightLeft, HandCoins, MessageCircle, Package, Timer } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import type { LiveListing } from "@/types";
import { formatExchangeItems, getExchange } from "@/data/exchanges";
import { liveDistanceText, liveListingPriceText, liveListingTypeText } from "@/data/liveListings";

type LiveListingCardProps = {
  listing: LiveListing;
};

const ctaText: Record<LiveListing["type"], string> = {
  resale: "查看 >",
  swap: "查看交换 >",
  rental: "查看 >",
  wanted: "联系 TA >",
};

const iconMap = {
  resale: Package,
  swap: ArrowRightLeft,
  rental: Timer,
  wanted: MessageCircle,
};

export function LiveListingCard({ listing }: LiveListingCardProps) {
  const Icon = iconMap[listing.type];
  const exchange = listing.type === "swap" && listing.relatedId ? getExchange(listing.relatedId) : undefined;
  const haveItem = exchange?.have[0];
  const wantItem = exchange?.want[0];
  const href =
    listing.type === "resale"
      ? `/live/products/${listing.relatedId ?? "shirt-001"}`
      : listing.type === "swap"
        ? `/exchange/${listing.relatedId ?? "exchange-001"}?from=live`
        : listing.type === "wanted"
          ? `/messages?chat=live-wanted&live=${listing.id}`
          : `/live/rentals/${listing.id}`;

  return (
    <article className="card w-full p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-black text-brand">
            <Icon size={15} />
            {liveListingTypeText(listing.type)}
          </div>
          <h2 className="mt-2 text-base font-black leading-6 text-ink">{listing.title}</h2>
          {exchange ? (
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="min-w-0">
                <AssetImage
                  alt="五月天周边卡片"
                  className="mb-1 h-11 w-11 rounded-xl bg-white"
                  fallbackLabel="卡片"
                  fallbackTone="card"
                  objectFit="cover"
                  priority={listing.relatedId === "exchange-001"}
                  src={haveItem?.imagePath}
                  sizes="44px"
                />
                <p className="truncate text-xs font-semibold text-muted">
                  TA 有：<span className="text-ink">{formatExchangeItems(exchange.have)}</span>
                </p>
              </div>
              <ArrowRightLeft className="text-brand" size={16} />
              <div className="min-w-0">
                <AssetImage
                  alt="五月天周边卡片"
                  className="mb-1 h-11 w-11 rounded-xl bg-white"
                  fallbackLabel="卡片"
                  fallbackTone="card"
                  objectFit="cover"
                  priority={listing.relatedId === "exchange-001"}
                  src={wantItem?.imagePath}
                  sizes="44px"
                />
                <p className="truncate text-xs font-semibold text-muted">
                  TA 想要：<span className="text-ink">{formatExchangeItems(exchange.want)}</span>
                </p>
              </div>
            </div>
          ) : null}
          <p className="mt-1 text-lg font-black text-brand">{liveListingPriceText(listing)}</p>
          <p className="mt-2 text-sm font-semibold text-ink">
            {liveDistanceText(listing.distanceMeters)} · {listing.meetupPoint}
          </p>
          <p className="mt-1 text-xs font-semibold text-muted">{listing.availableUntil}</p>
          {listing.sellerName ? <p className="mt-2 text-xs text-muted">发布者：{listing.sellerName}</p> : null}
        </div>
        {listing.imagePath ? (
          <AssetImage
            alt={listing.type === "rental" ? "五月天荧光棒" : "橙色应援 T 恤"}
            className="h-20 w-20 shrink-0 rounded-2xl bg-white"
            fallbackLabel={listing.type === "rental" ? "荧光棒" : "应援服"}
            fallbackTone={listing.type === "rental" ? "glowstick" : "shirt"}
            objectFit={listing.type === "rental" ? "contain" : "cover"}
            objectPosition="center"
            priority={listing.id === "live-resale-shirt-001" || listing.id === "live-rental-lightstick-001"}
            sizes="80px"
            src={listing.imagePath}
          />
        ) : (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-50 text-brand">
            <HandCoins size={18} />
          </div>
        )}
      </div>
      <Link className="mt-4 inline-flex text-sm font-bold text-brand" href={href}>
        {ctaText[listing.type]}
      </Link>
    </article>
  );
}
