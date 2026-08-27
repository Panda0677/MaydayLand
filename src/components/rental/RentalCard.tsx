import Link from "next/link";
import { Timer } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import type { RentalItem } from "@/types";
import { rentalDeliveryText } from "@/data/rentals";

type RentalCardProps = {
  rental: RentalItem;
};

export function RentalCard({ rental }: RentalCardProps) {
  const isGlowstick = rental.title.includes("荧光棒");
  const isShirt = rental.title.includes("应援服");

  return (
    <Link className="card block w-full p-4" href={`/rentals/${rental.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs font-black text-brand">
            <Timer size={15} />
            租赁
          </div>
          <h2 className="mt-2 text-base font-black leading-6 text-ink">{rental.title}</h2>
          <p className="mt-1 text-lg font-black text-brand">¥{rental.pricePerDay} / 天</p>
          <p className="mt-1 text-sm font-semibold text-ink">押金 ¥{rental.deposit}</p>
          <p className="mt-2 text-xs font-semibold text-muted">
            {rental.availableFrom}–{rental.availableTo} 可租
          </p>
          <p className="mt-1 text-xs font-semibold text-muted">{rentalDeliveryText(rental.delivery[0])}</p>
        </div>
        <AssetImage
          alt={isGlowstick ? "五月天荧光棒" : isShirt ? "橙色应援 T 恤" : rental.title}
          className="h-16 w-16 shrink-0 rounded-2xl bg-white"
          fallbackLabel={isGlowstick ? "荧光棒" : isShirt ? "应援服" : "租赁物"}
          fallbackTone={isGlowstick ? "glowstick" : isShirt ? "shirt" : "bag"}
          objectFit={isGlowstick ? "contain" : "cover"}
          objectPosition="center"
          sizes="64px"
          src={rental.imagePath}
        />
      </div>
      <span className="mt-4 inline-flex text-sm font-bold text-brand">
        查看 &gt;
      </span>
    </Link>
  );
}
