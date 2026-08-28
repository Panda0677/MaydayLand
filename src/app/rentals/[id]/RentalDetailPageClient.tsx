"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Timer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { BottomSheet } from "@/components/sheets/BottomSheet";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { getRental, rentalDeliveryText } from "@/data/rentals";
import { cn, formatEventShortDate } from "@/lib/utils";

const dateOptions = ["09.10", "09.11", "09.12", "09.13", "09.14", "09.15"];

function rentalDays(start: string, end: string) {
  const startDay = Number(start.split(".")[1]);
  const endDay = Number(end.split(".")[1]);
  return Math.max(1, endDay - startDay + 1);
}

type RentalDetailPageClientProps = {
  rentalId: string;
};

export default function RentalDetailPageClient({ rentalId }: RentalDetailPageClientProps) {
  const rental = getRental(rentalId);
  const event = rental ? getEvent(rental.eventId) : undefined;
  const [startDate, setStartDate] = useState("09.11");
  const [endDate, setEndDate] = useState("09.13");
  const [delivery, setDelivery] = useState<"concert_meetup" | "local">("concert_meetup");
  const [sheet, setSheet] = useState<"start" | "end" | null>(null);
  const [success, setSuccess] = useState(false);

  const summary = useMemo(() => {
    const days = rentalDays(startDate, endDate);
    const rent = rental ? days * rental.pricePerDay : 0;
    const deposit = rental?.deposit ?? 0;
    return { days, rent, deposit, total: rent + deposit };
  }, [endDate, rental, startDate]);

  if (!rental || !event) {
    return (
      <AppShell hideBottomNav>
        <TopHeader title="租赁详情" showBack />
        <div className="page-pad">租赁物品不存在</div>
      </AppShell>
    );
  }
  const isGlowstick = rental.title.includes("荧光棒");
  const isShirt = rental.title.includes("应援服");

  return (
    <AppShell hideBottomNav>
      <TopHeader title="租赁详情" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <AssetImage
            alt={isGlowstick ? "五月天荧光棒" : isShirt ? "橙色应援 T 恤" : rental.title}
            className="mb-4 h-36 rounded-2xl bg-white"
            fallbackLabel={isGlowstick ? "荧光棒" : isShirt ? "应援服" : "租赁物"}
            fallbackTone={isGlowstick ? "glowstick" : isShirt ? "shirt" : "bag"}
            objectFit={isGlowstick ? "contain" : "cover"}
            objectPosition="center"
            priority
            src={rental.imagePath}
          />
          <div className="flex items-center gap-2 text-xs font-black text-brand">
            <Timer size={15} />
            租赁
          </div>
          <h1 className="mt-3 text-xl font-black text-ink">{rental.title}</h1>
          <p className="mt-2 text-2xl font-black text-brand">¥{rental.pricePerDay} / 天</p>
          <div className="mt-3 grid gap-2 text-sm">
            <p className="font-bold text-ink">押金 ¥{rental.deposit}</p>
            <p className="text-muted">成色：{rental.condition}</p>
            <p className="text-muted">{rental.ownerName} · {rental.ownerCredit}</p>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">Event</h2>
          <div className="mt-3 rounded-2xl bg-orange-50 p-3">
            <p className="text-sm font-black text-ink">
              {event.artist}【{event.tour}】{event.city}站
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">
              {formatEventShortDate(event.datetime).split("（")[0]} · {event.venue}
            </p>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">选择租赁日期</h2>
          <div className="mt-3 grid gap-2">
            <button className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left" type="button" onClick={() => setSheet("start")}>
              <span>
                <span className="block text-xs text-muted">开始日期</span>
                <span className="mt-1 block text-sm font-bold text-ink">{startDate}</span>
              </span>
              <ChevronRight size={18} className="text-muted" />
            </button>
            <button className="flex min-h-14 items-center justify-between rounded-2xl border border-line p-3 text-left" type="button" onClick={() => setSheet("end")}>
              <span>
                <span className="block text-xs text-muted">结束日期</span>
                <span className="mt-1 block text-sm font-bold text-ink">{endDate}</span>
              </span>
              <ChevronRight size={18} className="text-muted" />
            </button>
          </div>
          <div className="mt-4 rounded-2xl bg-page p-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>{summary.days} 天租金</span>
              <span>¥{summary.rent}</span>
            </div>
            <div className="mt-2 flex justify-between text-muted">
              <span>押金</span>
              <span>¥{summary.deposit}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3 font-black text-ink">
              <span>本次需支付</span>
              <span className="text-brand">¥{summary.total}</span>
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">取还方式</h2>
          <div className="mt-3 grid gap-2">
            {(["concert_meetup", "local"] as const).map((method) => {
              const disabled = !rental.delivery.includes(method);
              const active = delivery === method;
              return (
                <button
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
                    active && "border-brand bg-orange-50 text-brand",
                    disabled && "opacity-40",
                  )}
                  disabled={disabled}
                  key={method}
                  type="button"
                  onClick={() => setDelivery(method)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <CheckCircle2 size={15} /> : null}
                  </span>
                  {rentalDeliveryText(method)}
                </button>
              );
            })}
          </div>
          {delivery === "concert_meetup" ? (
            <div className="mt-3 rounded-2xl bg-orange-50 p-3 text-sm">
              <p className="font-black text-ink">五月天上海站</p>
              <p className="mt-2 text-muted">取货点：{rental.meetupPoint}</p>
              <p className="mt-1 text-muted">取货时间：{rental.meetupTime}</p>
              <p className="mt-1 text-muted">归还信息：约定后在聊天中确认</p>
            </div>
          ) : null}
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[390px] items-center justify-between gap-3 border-t border-line bg-white p-3">
        <div>
          <p className="text-xs text-muted">本次需支付</p>
          <p className="text-xl font-black text-brand">¥{summary.total}</p>
        </div>
        <PrimaryButton className="w-40" onClick={() => setSuccess(true)}>
          确认租赁
        </PrimaryButton>
      </div>

      <BottomSheet open={sheet === "start"} title="开始日期" onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          {dateOptions.map((date) => (
            <button
              className={cn("flex min-h-12 items-center rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink", startDate === date && "border-brand bg-orange-50 text-brand")}
              key={date}
              type="button"
              onClick={() => {
                setStartDate(date);
                setSheet(null);
              }}
            >
              {date}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "end"} title="结束日期" onClose={() => setSheet(null)}>
        <div className="grid gap-2">
          {dateOptions.map((date) => (
            <button
              className={cn("flex min-h-12 items-center rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink", endDate === date && "border-brand bg-orange-50 text-brand")}
              key={date}
              type="button"
              onClick={() => {
                setEndDate(date);
                setSheet(null);
              }}
            >
              {date}
            </button>
          ))}
        </div>
      </BottomSheet>

      {success ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={() => setSuccess(false)} />
          <section className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-brand" size={48} />
            <h2 className="mt-4 text-xl font-black text-ink">租赁申请已提交</h2>
            <div className="mt-4 grid gap-1 text-sm font-semibold text-muted">
              <p className="font-black text-ink">{rental.title}</p>
              <p>{startDate}–{endDate}</p>
              <p>租金 ¥{summary.rent}</p>
              <p>押金 ¥{summary.deposit}</p>
              <p>{rentalDeliveryText(delivery)}</p>
            </div>
            <div className="mt-5 grid gap-2">
              <PrimaryButton className="w-full" href={`/messages?chat=rental-001&rental=${rental.id}`}>
                去聊天
              </PrimaryButton>
              <SecondaryButton className="w-full" href={`/events/${event.id}?tab=rental`}>
                返回租赁列表
              </SecondaryButton>
            </div>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
