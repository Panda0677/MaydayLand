import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AssetImage } from "@/components/media/AssetImage";
import { TopHeader } from "@/components/layout/TopHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { getLiveListing, liveDistanceText } from "@/data/liveListings";
import { getProduct } from "@/data/products";
import { formatEventShortDate } from "@/lib/utils";
import { productStaticParams } from "@/lib/staticParams";

type LiveProductPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return productStaticParams();
}

export default function LiveProductPage({ params }: LiveProductPageProps) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const liveListing = getLiveListing("live-resale-shirt-001");
  const event = getEvent(product.eventId);
  if (!event || !liveListing) notFound();

  const contactParams = new URLSearchParams({
    chat: "live-shirt-001",
    product: product.id,
    live: liveListing.id,
    point: liveListing.meetupPoint,
    time: liveListing.availableUntil,
  });
  const checkoutParams = new URLSearchParams({
    product: product.id,
    point: liveListing.meetupPoint,
    time: "18:00 前",
  });

  return (
    <AppShell hideBottomNav>
      <TopHeader title="现场商品" showBack />
      <div className="pb-24">
        <AssetImage
          alt="橙色应援 T 恤"
          className="h-52 bg-white"
          fallbackLabel="现场应援服"
          fallbackTone="shirt"
          objectFit="cover"
          objectPosition="center"
          priority
          src={product.imagePath}
        >
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2.5 py-1 text-xs font-black text-white">现场交易</span>
        </AssetImage>

        <div className="space-y-4 p-4">
          <section>
            <h1 className="page-title">{product.title}</h1>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-2xl font-black text-brand">¥{product.price}</p>
              <p className="pb-1 text-xs font-bold text-muted">{product.condition}</p>
            </div>
            <p className="mt-2 text-sm text-muted">{product.sellerName} · 信用良好</p>
          </section>

          <section className="card border-green-100 bg-green-50 p-4">
            <h2 className="text-base font-black text-green-800">现场交易</h2>
            <div className="mt-3 grid grid-cols-[92px_1fr] gap-y-3 text-sm">
              <span className="text-green-700">距离</span>
              <span className="text-right font-black text-ink">{liveDistanceText(liveListing.distanceMeters)}</span>
              <span className="text-green-700">公共面交点</span>
              <span className="text-right font-black text-ink">{liveListing.meetupPoint}</span>
              <span className="text-green-700">可面交</span>
              <span className="text-right font-black text-ink">{liveListing.availableUntil}</span>
            </div>
          </section>

          <section className="card p-4">
            <h2 className="text-base font-black text-ink">Event</h2>
            <Link className="mt-3 block rounded-2xl bg-page p-3" href={`/events/${event.id}/live`}>
              <p className="text-sm font-black text-ink">
                {event.artist}【{event.tour}】{event.city}站
              </p>
              <p className="mt-1 text-xs font-semibold text-muted">
                {formatEventShortDate(event.datetime).split("（")[0]} · {event.venue}
              </p>
            </Link>
          </section>

          <section className="card p-4">
            <h2 className="text-base font-black text-ink">商品描述</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{liveListing.description ?? product.description}</p>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[390px] items-center gap-2 border-t border-line bg-white p-3">
        <SecondaryButton className="h-12 w-[112px] whitespace-nowrap px-3 text-xs" href={`/messages?${contactParams.toString()}`}>
          <MessageCircle size={16} />
          现在联系
        </SecondaryButton>
        <PrimaryButton className="h-12 flex-1" href={`/checkout/${product.id}?${checkoutParams.toString()}`}>
          <ShoppingBag size={16} />
          我要买
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
