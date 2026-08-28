"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { formatExchangeItems, getExchange } from "@/data/exchanges";
import { formatEventShortDate, swapDeliveryText } from "@/lib/utils";

type SwapSuccessPageClientProps = {
  exchangeId: string;
};

export default function SwapSuccessPageClient({ exchangeId }: SwapSuccessPageClientProps) {
  const searchParams = useSearchParams();
  const exchange = getExchange(exchangeId);
  if (!exchange) return null;

  const event = getEvent(exchange.eventId);
  if (!event) return null;

  const mine = searchParams.get("mine") ?? formatExchangeItems(exchange.want);
  const point = searchParams.get("point") ?? "体育场东门";
  const time = searchParams.get("time") ?? "17:30–18:00";
  const deliveryParam = searchParams.get("delivery");
  const delivery = deliveryParam === "local" || deliveryParam === "shipping" ? deliveryParam : "concert_meetup";
  const chatParams = new URLSearchParams({
    chat: "exchange-accepted",
    exchange: exchange.id,
    mine,
    point,
    time,
    status: "pending",
  });

  return (
    <AppShell hideBottomNav>
      <TopHeader showBack />
      <div className="space-y-4 p-4">
        <section className="card grid justify-items-center p-7 text-center">
          <CheckCircle2 size={54} className="text-brand" />
          <h1 className="mt-4 text-2xl font-black text-ink">交换请求已发送</h1>
          <p className="mt-2 text-sm leading-6 text-muted">对方接受后，可在聊天中确认现场交换细节</p>
          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <PrimaryButton href={`/messages?${chatParams.toString()}`}>去聊天</PrimaryButton>
            <SecondaryButton href={`/events/${event.id}?tab=swap`}>查看交换列表</SecondaryButton>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">交换摘要</h2>
          <dl className="mt-3 grid grid-cols-[92px_1fr] gap-y-3 text-sm">
            <dt className="text-muted">你提供</dt>
            <dd className="text-right font-bold text-ink">{mine}</dd>
            <dt className="text-muted">你希望获得</dt>
            <dd className="text-right font-bold text-ink">{formatExchangeItems(exchange.have)}</dd>
            <dt className="text-muted">交换方式</dt>
            <dd className="text-right font-bold text-ink">{swapDeliveryText(delivery)}</dd>
            <dt className="text-muted">演唱会</dt>
            <dd className="text-right font-bold text-ink">
              {event.artist}{event.city}站 · {formatEventShortDate(event.datetime).split("（")[0]}
            </dd>
            <dt className="text-muted">地点时间</dt>
            <dd className="text-right font-bold text-ink">
              {point} · {time}
            </dd>
          </dl>
        </section>

        <Link className="block text-center text-sm font-bold text-brand" href="/">
          返回首页
        </Link>
      </div>
    </AppShell>
  );
}
