import Link from "next/link";
import { Heart } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { Product } from "@/types";
import { deliveryText } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const mediaTone: Record<string, "glowstick" | "shirt" | "bag" | "poster"> = {
  "orange-glow": "glowstick",
  shirt: "shirt",
  bag: "bag",
  poster: "poster",
};

function productAlt(product: Product) {
  if (product.category === "glowstick") return "五月天荧光棒";
  if (product.category === "clothing") return "橙色应援 T 恤";
  if (product.category === "card") return "五月天周边卡片";
  return product.title;
}

function productFallbackLabel(product: Product) {
  if (product.category === "clothing") return "应援服";
  if (product.category === "poster") return "海报";
  if (product.category === "card") return "周边卡片";
  return "周边";
}

export function ProductCard({ product }: ProductCardProps) {
  const canMeet = product.delivery.includes("concert_meetup");
  const fallbackTone = mediaTone[product.image] ?? "default";
  const media = product.imagePath ? (
    <AssetImage
      alt={productAlt(product)}
      className="h-32 bg-white"
      fallbackLabel={productFallbackLabel(product)}
      fallbackTone={fallbackTone}
      objectFit={product.category === "glowstick" ? "contain" : "cover"}
      objectPosition="center"
      priority={product.id === "glow-stick-001" || product.id === "shirt-001"}
      src={product.imagePath}
      sizes="(max-width: 390px) 50vw, 180px"
    >
      {canMeet && (
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-brand">
          {deliveryText("concert_meetup")}
        </span>
      )}
      <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-muted">
        <Heart size={16} />
      </span>
    </AssetImage>
  ) : (
    <MediaPlaceholder className="h-32" label={productFallbackLabel(product)} tone={fallbackTone}>
      {canMeet && (
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-brand">
          {deliveryText("concert_meetup")}
        </span>
      )}
      <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-muted">
        <Heart size={16} />
      </span>
    </MediaPlaceholder>
  );

  return (
    <Link className="card block overflow-hidden transition active:scale-[0.995]" href={`/products/${product.id}`}>
      {media}
      <div className="p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-ink">{product.title}</h3>
        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="price-text">¥{product.price}</p>
          <p className="truncate text-[11px] text-muted">{product.condition}</p>
        </div>
      </div>
    </Link>
  );
}
