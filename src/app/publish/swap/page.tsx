"use client";

import { useState } from "react";
import { Check, CheckCircle2, ImagePlus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { getEvent } from "@/data/events";
import { cn, formatEventShortDate, swapDeliveryText } from "@/lib/utils";
import type { DeliveryMethod } from "@/types";

const event = getEvent("mayday-shanghai-20260912");
const deliveryMethods: DeliveryMethod[] = ["concert_meetup", "local", "shipping"];

export default function PublishSwapPage() {
  const [acceptTopUp, setAcceptTopUp] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState<DeliveryMethod[]>(["concert_meetup", "local", "shipping"]);
  const [success, setSuccess] = useState(false);

  function toggleMethod(method: DeliveryMethod) {
    setSelectedMethods((current) => {
      if (current.includes(method)) {
        return current.length === 1 ? current : current.filter((item) => item !== method);
      }
      return [...current, method];
    });
  }

  return (
    <AppShell hideBottomNav>
      <TopHeader title="发布交换" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <h1 className="text-base font-black text-ink">我有</h1>
          <div className="mt-3 grid grid-cols-[96px_1fr] gap-3">
            <AssetImage
              alt="五月天周边卡片"
              className="h-24 w-24 rounded-2xl bg-white"
              fallbackLabel="卡片"
              fallbackTone="card"
              objectFit="cover"
              src="/assets/cards/ashin-card.jpg"
              sizes="96px"
            >
              <span className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand">
                <ImagePlus size={18} />
              </span>
            </AssetImage>
            <div className="grid gap-2">
              <label className="rounded-2xl border border-line bg-white px-3 py-2">
                <span className="text-xs text-muted">名称</span>
                <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="阿信限定卡" />
              </label>
              <label className="rounded-2xl border border-line bg-white px-3 py-2">
                <span className="text-xs text-muted">数量</span>
                <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="1" inputMode="numeric" />
              </label>
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">我想要</h2>
          <div className="mt-3 grid gap-2">
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">名称</span>
              <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="怪兽限定卡" />
            </label>
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">数量</span>
              <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="1" inputMode="numeric" />
            </label>
          </div>
        </section>

        <section className="card flex items-center justify-between gap-3 p-4">
          <div>
            <h2 className="text-base font-black text-ink">是否接受补差价</h2>
            <p className="mt-1 text-xs text-muted">{acceptTopUp ? "开启" : "关闭"}</p>
          </div>
          <button
            aria-pressed={acceptTopUp}
            className={cn("flex h-8 w-14 items-center rounded-full p-1 transition", acceptTopUp ? "bg-brand" : "bg-line")}
            type="button"
            onClick={() => setAcceptTopUp((value) => !value)}
          >
            <span className={cn("h-6 w-6 rounded-full bg-white transition", acceptTopUp && "translate-x-6")} />
          </button>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">关联 Event</h2>
          <div className="mt-3 rounded-2xl bg-orange-50 p-3">
            <p className="text-sm font-black text-ink">
              {event ? `${event.artist}【${event.tour}】${event.city}站` : "五月天【回到那一天】上海站"}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">
              {event ? `${formatEventShortDate(event.datetime)} · ${event.venue}` : "09.12（周六） · 上海体育场"}
            </p>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">交换方式</h2>
          <p className="mt-1 text-xs text-muted">选择你支持的交换方式</p>
          <div className="mt-3 grid gap-2">
            {deliveryMethods.map((method) => {
              const active = selectedMethods.includes(method);
              return (
                <button
                  aria-pressed={active}
                  className={cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
                    active && "border-brand bg-orange-50 text-brand",
                  )}
                  key={method}
                  type="button"
                  onClick={() => toggleMethod(method)}
                >
                  <span className={cn("grid h-5 w-5 place-items-center rounded-md border border-line", active && "border-brand bg-brand text-white")}>
                    {active ? <Check size={15} strokeWidth={3} /> : null}
                  </span>
                  {swapDeliveryText(method)}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[390px] border-t border-line bg-white p-3">
        <PrimaryButton className="w-full" onClick={() => setSuccess(true)}>
          发布交换
        </PrimaryButton>
      </div>

      {success ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={() => setSuccess(false)} />
          <section className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-brand" size={48} />
            <h2 className="mt-4 text-xl font-black text-ink">交换需求已发布</h2>
            <PrimaryButton className="mt-5 w-full" href="/events/mayday-shanghai-20260912?tab=swap">
              查看交换列表
            </PrimaryButton>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
