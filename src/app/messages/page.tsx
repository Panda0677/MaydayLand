"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bell, Send } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { UserAvatar } from "@/components/media/UserAvatar";
import { TopHeader } from "@/components/layout/TopHeader";
import { getEvent } from "@/data/events";
import { formatExchangeItems, getExchange } from "@/data/exchanges";
import { getLiveListing, liveDistanceText, liveListingPriceText } from "@/data/liveListings";
import { messageThreads } from "@/data/messages";
import { getProduct } from "@/data/products";
import { getRental } from "@/data/rentals";
import { formatEventShortDate } from "@/lib/utils";

function MessagesContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const activeThread = messageThreads.find((thread) => thread.id === chatId);
  const productId = searchParams.get("product") ?? activeThread?.productId ?? "shirt-001";
  const product = getProduct(productId);
  const event = product ? getEvent(product.eventId) : undefined;
  const liveListingId = searchParams.get("live") ?? activeThread?.liveListingId ?? "live-resale-shirt-001";
  const liveListing = getLiveListing(liveListingId);
  const liveEvent = liveListing ? getEvent(liveListing.eventId) : event;
  const point = searchParams.get("point") ?? activeThread?.point ?? "体育场东门";
  const time = searchParams.get("time") ?? activeThread?.time ?? "17:30–18:00";
  const eventShortDate = event ? formatEventShortDate(event.datetime) : "09.12（周六）";
  const eventMonthDay = eventShortDate.split("（")[0];
  const exchangeId = searchParams.get("exchange") ?? activeThread?.exchangeId ?? "exchange-001";
  const exchange = getExchange(exchangeId);
  const exchangeEvent = exchange ? getEvent(exchange.eventId) : undefined;
  const exchangeEventShortDate = exchangeEvent ? formatEventShortDate(exchangeEvent.datetime) : "09.12（周六）";
  const exchangeMine = searchParams.get("mine") ?? activeThread?.mine ?? (exchange ? formatExchangeItems(exchange.want) : "阿信限定卡 ×1");
  const exchangePoint = searchParams.get("point") ?? activeThread?.point ?? "体育场东门";
  const exchangeTime = searchParams.get("time") ?? activeThread?.time ?? "17:30–18:00";
  const swapStatus = searchParams.get("status") === "pending" ? "pending" : activeThread?.swapStatus ?? "accepted";
  const swapStatusText = swapStatus === "pending" ? "等待对方接受" : "交换进行中";
  const rentalId = searchParams.get("rental") ?? activeThread?.rentalId ?? "rental-001";
  const rental = getRental(rentalId);
  const rentalEvent = rental ? getEvent(rental.eventId) : undefined;
  const orderUrl = `/orders/demo-order-001/success?${new URLSearchParams({
    product: product?.id ?? "shirt-001",
    point,
    time,
  }).toString()}`;

  if (activeThread?.kind === "notification") {
    return (
      <AppShell hideBottomNav>
        <TopHeader title="系统通知" showBack />
        <div className="space-y-4 p-4">
          <section className="card p-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-brand">
              <Bell size={20} />
            </div>
            <h1 className="mt-4 text-xl font-black text-ink">订单已创建</h1>
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-bold text-ink">{product?.title ?? "橙色应援 T 恤 L 码"}</p>
              <p className="text-muted">
                {event ? `${event.artist}【${event.tour}】${event.city}站` : "五月天【回到那一天】上海站"}
              </p>
              <p className="text-muted">{eventShortDate}</p>
              <p className="text-muted">
                {point} · {time}
              </p>
            </div>
            <Link className="mt-5 inline-flex text-sm font-bold text-brand" href={orderUrl}>
              查看订单 &gt;
            </Link>
          </section>
        </div>
      </AppShell>
    );
  }

  if (activeThread?.kind === "live" && liveListing) {
    const livePrice = liveListingPriceText(liveListing);
    return (
      <AppShell hideBottomNav>
        <TopHeader title={activeThread.title} showBack />
        <div className="flex min-h-[calc(100dvh-52px)] flex-col p-4">
          <section className="card mb-4 border-green-100 bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <UserAvatar className="h-9 w-9 text-xs" name={activeThread.title} sizes="36px" />
              <p className="text-sm font-black text-green-800">现场交易</p>
            </div>
            <div className="mt-2 grid gap-1 text-xs font-semibold text-green-700">
              <p className="text-ink">
                {liveListing.title} {livePrice}
              </p>
              <p>{liveEvent ? `${liveEvent.artist}${liveEvent.city}站 · 今日` : "五月天上海站 · 今日"}</p>
              <p>{liveListing.meetupPoint}</p>
              <p>{liveDistanceText(liveListing.distanceMeters)}</p>
              <p>{liveListing.availableUntil}</p>
            </div>
          </section>
          <div className="flex-1 space-y-3">
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              我已经到体育场附近了，现在可以面交吗？
            </div>
            <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-6 text-ink shadow-soft">
              可以，我在东门附近，18:00 前都可以。
            </div>
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              好的，我大概 10 分钟到。
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-white p-2">
            <input className="min-w-0 flex-1 px-2 text-sm outline-none" placeholder="输入消息" />
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white" type="button" aria-label="发送">
              <Send size={18} />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (activeThread?.kind === "rental" && rental) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title={rental.ownerName} showBack />
        <div className="flex min-h-[calc(100dvh-52px)] flex-col p-4">
          <section className="card mb-4 p-3">
            <div className="flex items-start gap-3">
              <UserAvatar className="h-9 w-9 text-xs" name={rental.ownerName} sizes="36px" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-ink">租赁</p>
                <div className="mt-2 grid gap-1 text-xs font-semibold text-muted">
                  <p className="text-ink">{rental.title}</p>
                  <p>09.11–09.13</p>
                  <p>
                    ¥{rental.pricePerDay} / 天 · 押金 ¥{rental.deposit}
                  </p>
                  <p>{rentalEvent ? `${rentalEvent.artist}${rentalEvent.city}站` : "五月天上海站"}</p>
                  <p>{rental.meetupPoint}</p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex-1 space-y-3">
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              9 月 11 日现场取方便吗？
            </div>
            <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-6 text-ink shadow-soft">
              可以，17:30 体育场东门见。
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-white p-2">
            <input className="min-w-0 flex-1 px-2 text-sm outline-none" placeholder="输入消息" />
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white" type="button" aria-label="发送">
              <Send size={18} />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (activeThread?.kind === "swap" && exchange) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title={exchange.ownerName} showBack />
        <div className="flex min-h-[calc(100dvh-52px)] flex-col p-4">
          <section className="card mb-4 p-3">
            <div className="flex items-start gap-3">
              <UserAvatar className="h-9 w-9 text-xs" name={exchange.ownerName} sizes="36px" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black text-ink">交换请求</p>
                  <span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-bold text-brand">{swapStatusText}</span>
                </div>
                <div className="mt-2 grid gap-1 text-xs font-semibold text-muted">
                  <p>
                    我提供：<span className="text-ink">{exchangeMine}</span>
                  </p>
                  <p>
                    对方提供：<span className="text-ink">{formatExchangeItems(exchange.have)}</span>
                  </p>
                  <p>
                    {exchangeEvent ? `${exchangeEvent.artist}${exchangeEvent.city}站 · ${exchangeEventShortDate.split("（")[0]}` : "五月天上海站 · 09.12"}
                  </p>
                  <p>
                    {exchangePoint} · {exchangeTime}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex-1 space-y-3">
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              9 月 12 日现场交换方便吗？
            </div>
            <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-6 text-ink shadow-soft">
              可以，17:30 体育场东门见。
            </div>
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              好的，到时候提前联系。
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-white p-2">
            <input className="min-w-0 flex-1 px-2 text-sm outline-none" placeholder="输入消息" />
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white" type="button" aria-label="发送">
              <Send size={18} />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (activeThread?.kind === "chat") {
    return (
      <AppShell hideBottomNav>
        <TopHeader title={product?.sellerName ?? activeThread.title} showBack />
        <div className="flex min-h-[calc(100dvh-52px)] flex-col p-4">
          <section className="card mb-4 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <UserAvatar className="h-9 w-9 text-xs" name={product?.sellerName ?? activeThread.title} sizes="36px" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-ink">
                    {product?.title ?? "橙色应援 T 恤 L 码"} <span className="text-brand">¥{product?.price ?? 60}</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    {event ? `${event.artist}${event.city}站 · ${eventMonthDay}` : "五月天上海站 · 09.12"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    {point} · {time}
                  </p>
                </div>
              </div>
              <a className="shrink-0 text-xs font-bold text-brand" href={orderUrl}>
                查看订单 &gt;
              </a>
            </div>
          </section>
          <div className="flex-1 space-y-3">
            <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-6 text-ink shadow-soft">
              9 月 12 日演出当天可以在体育场东门面交吗？
            </div>
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-brand p-3 text-sm leading-6 text-white shadow-soft">
              可以，我会在 {time} 到{point}，到时候提前联系你。
            </div>
            <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-6 text-ink shadow-soft">
              好的，到了我发你消息。
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-white p-2">
            <input className="min-w-0 flex-1 px-2 text-sm outline-none" placeholder="输入消息" />
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white" type="button" aria-label="发送">
              <Send size={18} />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <TopHeader title="消息" />
      <div className="w-full px-4 pb-[92px] pt-3">
        <div className="grid w-full gap-3">
          {messageThreads.map((thread) => {
            const threadExchange = thread.exchangeId ? getExchange(thread.exchangeId) : undefined;
            const avatarName = thread.kind === "swap" && threadExchange ? threadExchange.ownerName : thread.title;
            const content = (
              <>
                <UserAvatar className="h-11 w-11" name={avatarName} />
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <p className="min-w-0 truncate font-bold text-ink">{thread.title}</p>
                    <span className="shrink-0 rounded-full bg-page px-2 py-1 text-[11px] font-bold text-muted">
                      {thread.type}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">{thread.preview}</p>
                </div>
                {thread.unread ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand" /> : null}
              </>
            );

            const params = new URLSearchParams({
              chat: thread.id,
              ...(thread.productId ? { product: thread.productId } : {}),
              ...(thread.exchangeId ? { exchange: thread.exchangeId } : {}),
              ...(thread.rentalId ? { rental: thread.rentalId } : {}),
              ...(thread.liveListingId ? { live: thread.liveListingId } : {}),
              ...(thread.mine ? { mine: thread.mine } : {}),
              ...(thread.swapStatus ? { status: thread.swapStatus } : {}),
              ...(thread.point ? { point: thread.point } : {}),
              ...(thread.time ? { time: thread.time } : {}),
            });

            return (
              <a className="card flex w-full min-w-0 items-start gap-3 p-4" href={`/messages?${params.toString()}`} key={thread.id}>
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <TopHeader title="消息" />
          <div className="page-pad text-sm text-muted">加载消息中...</div>
        </AppShell>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
