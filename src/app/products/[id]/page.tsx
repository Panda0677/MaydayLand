import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { SellerCard } from "@/components/commerce/SellerCard";
import { AssetImage } from "@/components/media/AssetImage";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { getProduct } from "@/data/products";
import { deliveryText } from "@/lib/utils";

const mediaTone: Record<string, "glowstick" | "shirt" | "bag" | "poster"> = {
  "orange-glow": "glowstick",
  shirt: "shirt",
  bag: "bag",
  poster: "poster",
};

function productAlt(category: string, title: string) {
  if (category === "glowstick") return "五月天荧光棒";
  if (category === "clothing") return "橙色应援 T 恤";
  if (category === "card") return "五月天周边卡片";
  return title;
}

function fallbackLabel(category: string) {
  if (category === "clothing") return "应援服";
  if (category === "poster") return "海报";
  if (category === "card") return "周边卡片";
  return "周边";
}

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = getProduct(id);
  if (!product) notFound();

  const event = getEvent(product.eventId);
  if (!event) notFound();

  const chatParams = new URLSearchParams({
    chat: "demo-order-001",
    product: product.id,
    point: product.meetupPoint ?? "体育场东门",
    time: "17:30–18:00",
  });

  return (
    <AppShell hideBottomNav>
      <TopHeader showBack more />
      <div className="pb-24">
        {product.imagePath ? (
          <AssetImage
            alt={productAlt(product.category, product.title)}
            className="relative h-56 bg-white"
            fallbackLabel={fallbackLabel(product.category)}
            fallbackTone={mediaTone[product.image] ?? "default"}
            objectFit={product.category === "glowstick" ? "contain" : "cover"}
            objectPosition="center"
            priority
            src={product.imagePath}
          >
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">1/3</span>
          </AssetImage>
        ) : (
          <MediaPlaceholder className="relative h-56" label={fallbackLabel(product.category)} tone={mediaTone[product.image] ?? "default"}>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">1/3</span>
          </MediaPlaceholder>
        )}
        <div className="space-y-4 p-4">
          <section>
            <h1 className="page-title">{product.title}</h1>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-[24px] font-black leading-7 text-brand">¥{product.price}</p>
              {product.originalPrice ? <p className="pb-1 text-xs text-muted line-through">¥{product.originalPrice}</p> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.delivery.map((method) => (
                <span className="chip" key={method}>
                  {deliveryText(method)}
                </span>
              ))}
            </div>
          </section>

          <section className="card grid grid-cols-[72px_1fr] gap-y-3 p-4 text-sm">
            <span className="text-muted">成色</span>
            <span className="text-right font-bold text-ink">{product.condition}</span>
            <span className="text-muted">数量</span>
            <span className="text-right font-bold text-ink">1 件</span>
            <span className="text-muted">所属 Event</span>
            <Link className="text-right font-bold text-brand" href={`/events/${event.id}`}>
              {event.artist}【{event.tour}】{event.city}站
            </Link>
          </section>

          <SellerCard product={product} />

          <section className="card p-4">
            <h2 className="text-base font-black text-ink">商品描述</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[390px] items-center gap-2 border-t border-line bg-white p-3">
        <SecondaryButton className="h-12 w-[92px] whitespace-nowrap px-3 text-xs" href={`/messages?${chatParams.toString()}`}>
          <MessageCircle size={16} />
          聊一聊
        </SecondaryButton>
        <SecondaryButton className="h-12 w-[78px] whitespace-nowrap px-3 text-xs">
          <Heart size={16} />
          收藏
        </SecondaryButton>
        <PrimaryButton className="h-12 flex-1" href={`/checkout/${product.id}`}>
          立即购买
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
