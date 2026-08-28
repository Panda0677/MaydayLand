"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { MeetupPointSelector } from "@/components/commerce/MeetupPointSelector";
import { TimeSlotSelector } from "@/components/commerce/TimeSlotSelector";
import { meetupPoints, timeSlots } from "@/data/checkout";
import { getEvent } from "@/data/events";
import { getProduct } from "@/data/products";
import { cn, deliveryText, formatEventShortDate } from "@/lib/utils";
import type { DeliveryMethod } from "@/types";

const deliveryMethods: DeliveryMethod[] = ["shipping", "local", "concert_meetup"];

type CheckoutPageClientProps = {
  productId: string;
};

export default function CheckoutPageClient({ productId }: CheckoutPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = getProduct(productId);
  const event = product ? getEvent(product.eventId) : undefined;
  const [delivery, setDelivery] = useState<DeliveryMethod>("concert_meetup");
  const [meetupPoint, setMeetupPoint] = useState(searchParams.get("point") ?? meetupPoints[0]);
  const [timeSlot, setTimeSlot] = useState(searchParams.get("time") ?? timeSlots[1]);
  const [sheet, setSheet] = useState<"point" | "time" | null>(null);

  const availableMethods = useMemo(() => product?.delivery ?? [], [product]);

  if (!product) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title="确认订单" showBack />
        <div className="page-pad">商品不存在</div>
      </AppShell>
    );
  }

  return (
    <AppShell hideBottomNav>
      <TopHeader title="确认订单" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card flex gap-3 p-3">
          <AssetImage
            alt={product.category === "glowstick" ? "五月天荧光棒" : "橙色应援 T 恤"}
            className="h-20 w-20 flex-none rounded-2xl bg-white"
            fallbackLabel={product.category === "glowstick" ? "荧光棒" : "应援服"}
            fallbackTone={product.category === "glowstick" ? "glowstick" : "shirt"}
            objectFit={product.category === "glowstick" ? "contain" : "cover"}
            objectPosition="center"
            sizes="80px"
            src={product.imagePath}
          />
          <div className="min-w-0 flex-1">
            <h1 className="line-clamp-2 text-sm font-black leading-5 text-ink">{product.title}</h1>
            <p className="mt-2 text-lg font-black text-brand">¥{product.price}</p>
            <p className="mt-1 text-xs text-muted">卖家：{product.sellerName}</p>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">选择交付方式</h2>
          <div className="mt-3 grid gap-2">
            {deliveryMethods.map((method) => {
              const disabled = !availableMethods.includes(method);
              const active = delivery === method;
              return (
                <button
                  className={cn(
                    "flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white p-3 text-left",
                    active && "border-brand bg-orange-50",
                    disabled && "opacity-40",
                  )}
                  disabled={disabled}
                  key={method}
                  type="button"
                  onClick={() => setDelivery(method)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <CheckCircle2 size={16} /> : null}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{deliveryText(method)}</span>
                    {method === "concert_meetup" ? <span className="text-xs text-muted">演出当天在公共地点面交</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">现场面交信息</h2>
          {delivery === "concert_meetup" && event ? (
            <div className="mt-3 rounded-2xl bg-orange-50 p-3">
              <p className="text-sm font-black text-ink">
                {event.artist}【{event.tour}】{event.city}站
              </p>
              <p className="mt-1 text-xs font-semibold text-muted">
                {formatEventShortDate(event.datetime)} · {event.venue}
              </p>
            </div>
          ) : null}
          <div className="mt-3 grid gap-2">
            <button
              className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left"
              type="button"
              onClick={() => setSheet("point")}
            >
              <span>
                <span className="block text-xs text-muted">公共面交点</span>
                <span className="mt-1 block text-sm font-bold text-ink">{meetupPoint}</span>
              </span>
              <ChevronRight size={18} className="text-muted" />
            </button>
            <button
              className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left"
              type="button"
              onClick={() => setSheet("time")}
            >
              <span>
                <span className="block text-xs text-muted">时间段</span>
                <span className="mt-1 block text-sm font-bold text-ink">{timeSlot}</span>
              </span>
              <ChevronRight size={18} className="text-muted" />
            </button>
          </div>
        </section>

        <section className="card p-4">
          <div className="flex justify-between text-sm text-muted">
            <span>商品金额</span>
            <span>¥{product.price}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-muted">
            <span>运费</span>
            <span>¥0</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-3 text-base font-black text-ink">
            <span>合计</span>
            <span className="text-brand">¥{product.price}</span>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[390px] items-center justify-between gap-3 border-t border-line bg-white p-3">
        <div>
          <p className="text-xs text-muted">合计</p>
          <p className="text-xl font-black text-brand">¥{product.price}</p>
        </div>
        <PrimaryButton
          className="w-44"
          onClick={() => {
            const search = new URLSearchParams({
              product: product.id,
              point: meetupPoint,
              time: timeSlot,
            });
            router.push(`/orders/demo-order-001/success?${search.toString()}`);
          }}
        >
          提交订单
        </PrimaryButton>
      </div>

      <BottomSheet open={sheet === "point"} title="选择公共面交点" onClose={() => setSheet(null)}>
        <MeetupPointSelector
          value={meetupPoint}
          onSelect={(value) => {
            setMeetupPoint(value);
            setSheet(null);
          }}
        />
      </BottomSheet>

      <BottomSheet open={sheet === "time"} title="选择时间段" onClose={() => setSheet(null)}>
        <TimeSlotSelector
          value={timeSlot}
          onSelect={(value) => {
            setTimeSlot(value);
            setSheet(null);
          }}
        />
      </BottomSheet>
    </AppShell>
  );
}
