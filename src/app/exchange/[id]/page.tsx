import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { UserAvatar } from "@/components/media/UserAvatar";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryActionButton } from "@/components/ui/SecondaryActionButton";
import { getEvent } from "@/data/events";
import { formatExchangeItems, getExchange } from "@/data/exchanges";
import { formatEventShortDate, swapDeliveryText } from "@/lib/utils";
import { exchangeStaticParams } from "@/lib/staticParams";

type ExchangeDetailPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return exchangeStaticParams();
}

export default function ExchangeDetailPage({ params }: ExchangeDetailPageProps) {
  const exchange = getExchange(params.id);
  if (!exchange) notFound();

  const event = getEvent(exchange.eventId);
  if (!event) notFound();

  const chatParams = new URLSearchParams({
    chat: "exchange-accepted",
    exchange: exchange.id,
    mine: formatExchangeItems(exchange.want),
    point: "体育场东门",
    time: "17:30–18:00",
    status: "pending",
  });
  const haveItem = exchange.have[0];
  const wantItem = exchange.want[0];

  return (
    <AppShell hideBottomNav>
      <TopHeader title="交换详情" showBack />
      <div className="space-y-4 p-4 pb-24">
        <section className="card p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-brand">
            <ArrowRightLeft size={17} />
            交换周边
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
            <div className="rounded-2xl border border-orange-100 bg-brand-soft p-3">
              <AssetImage
                alt="五月天周边卡片"
                className="mb-3 h-20 rounded-xl bg-white"
                fallbackLabel="卡片"
                fallbackTone="card"
                objectFit="cover"
                priority
                src={haveItem?.imagePath}
                sizes="140px"
              />
              <p className="text-xs font-bold text-muted">对方有</p>
              <p className="mt-2 text-base font-black leading-6 text-ink">{formatExchangeItems(exchange.have)}</p>
            </div>
            <div className="grid place-items-center text-brand">
              <ArrowRightLeft size={20} />
            </div>
            <div className="rounded-2xl border border-line bg-page p-3">
              <AssetImage
                alt="五月天周边卡片"
                className="mb-3 h-20 rounded-xl bg-white"
                fallbackLabel="卡片"
                fallbackTone="card"
                objectFit="cover"
                priority
                src={wantItem?.imagePath}
                sizes="140px"
              />
              <p className="text-xs font-bold text-muted">对方想要</p>
              <p className="mt-2 text-base font-black leading-6 text-ink">{formatExchangeItems(exchange.want)}</p>
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">交换条件</h2>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-ink">
            {exchange.allowCashTopUp ? (
              <p className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-brand" />
                接受补差价
              </p>
            ) : null}
            {exchange.delivery.map((method) => (
              <p className="flex items-center gap-2" key={method}>
                <CheckCircle2 size={17} className="text-brand" />
                支持{swapDeliveryText(method)}
              </p>
            ))}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">所属 Event</h2>
          <Link className="mt-3 block rounded-2xl bg-page p-3" href={`/events/${event.id}?tab=swap`}>
            <p className="text-sm font-black text-ink">
              {event.artist}【{event.tour}】{event.city}站
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">
              {formatEventShortDate(event.datetime)} · {event.venue}
            </p>
          </Link>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">用户</h2>
          <div className="mt-3 flex items-center gap-3">
            <UserAvatar className="h-11 w-11" name={exchange.ownerName} />
            <div>
              <p className="font-bold text-ink">{exchange.ownerName}</p>
              <p className="mt-1 text-xs text-muted">{exchange.ownerCredit}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[390px] items-center gap-2 border-t border-line bg-white p-3">
        <SecondaryActionButton href={`/messages?${chatParams.toString()}`} icon={MessageCircle}>
          聊一聊
        </SecondaryActionButton>
        <PrimaryButton className="h-12 flex-1" href={`/exchange/${exchange.id}/request`}>
          我可以换
        </PrimaryButton>
      </div>
    </AppShell>
  );
}
