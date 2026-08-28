import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";
import { AssetImage } from "@/components/media/AssetImage";
import { UserAvatar } from "@/components/media/UserAvatar";
import type { ExchangePost } from "@/types";
import { swapDeliveryText } from "@/lib/utils";
import { formatExchangeItems } from "@/data/exchanges";

type ExchangeCardProps = {
  exchange: ExchangePost;
};

export function ExchangeCard({ exchange }: ExchangeCardProps) {
  const haveItem = exchange.have[0];
  const wantItem = exchange.want[0];

  return (
    <article className="card w-full p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-brand">
        <ArrowRightLeft size={15} />
        结构化交换
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
        <div className="min-w-0 rounded-2xl border border-orange-100 bg-brand-soft p-3">
          <AssetImage
            alt="五月天周边卡片"
            className="mb-2 h-14 w-14 rounded-xl bg-white"
            fallbackLabel="卡片"
            fallbackTone="card"
            objectFit="cover"
            priority={exchange.id === "exchange-001"}
            src={haveItem?.imagePath}
            sizes="56px"
          />
          <p className="text-xs font-bold text-muted">TA 有</p>
          <p className="mt-1 text-sm font-black leading-5 text-ink">{formatExchangeItems(exchange.have)}</p>
        </div>
        <div className="grid place-items-center text-brand">
          <ArrowRightLeft size={18} />
        </div>
        <div className="min-w-0 rounded-2xl border border-line bg-page p-3">
          <AssetImage
            alt="五月天周边卡片"
            className="mb-2 h-14 w-14 rounded-xl bg-white"
            fallbackLabel="卡片"
            fallbackTone="card"
            objectFit="cover"
            priority={exchange.id === "exchange-001"}
            src={wantItem?.imagePath}
            sizes="56px"
          />
          <p className="text-xs font-bold text-muted">TA 想要</p>
          <p className="mt-1 text-sm font-black leading-5 text-ink">{formatExchangeItems(exchange.want)}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {exchange.allowCashTopUp ? <span className="chip">可补差价</span> : null}
        {exchange.suggestedTopUp ? <span className="chip">¥{exchange.suggestedTopUp}</span> : null}
        {exchange.delivery.includes("concert_meetup") ? <span className="chip">{swapDeliveryText("concert_meetup")}</span> : null}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <UserAvatar className="h-8 w-8 text-xs" name={exchange.ownerName} sizes="32px" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">用户：{exchange.ownerName}</p>
            <p className="mt-0.5 text-xs text-muted">{exchange.ownerCredit}</p>
          </div>
        </div>
        <Link className="shrink-0 text-sm font-bold text-brand" href={`/exchange/${exchange.id}`}>
          查看交换 &gt;
        </Link>
      </div>
    </article>
  );
}
