"use client";

import { useState } from "react";
import { Check, CheckCircle2, ImagePlus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { AssetImage } from "@/components/media/AssetImage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { getEvent } from "@/data/events";
import { cn, formatEventShortDate } from "@/lib/utils";

const event = getEvent("mayday-shanghai-20260912");

export default function PublishRentalPage() {
  const [supportConcertReturn, setSupportConcertReturn] = useState(true);
  const [success, setSuccess] = useState(false);

  return (
    <AppShell hideBottomNav>
      <TopHeader title="发布租赁" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <h1 className="text-base font-black text-ink">商品图片</h1>
          <button className="mt-3 block overflow-hidden rounded-2xl text-brand" type="button">
            <AssetImage
              alt="五月天荧光棒"
              className="h-28 w-28 rounded-2xl bg-white"
              fallbackLabel="荧光棒"
              fallbackTone="glowstick"
              objectFit="contain"
              src="/assets/products/mayday-glowstick-square.jpg"
              sizes="112px"
            >
              <span className="absolute inset-x-0 bottom-0 grid place-items-center gap-1 bg-white/90 py-1.5 text-xs font-bold">
              <ImagePlus size={24} />
              添加图片
              </span>
            </AssetImage>
          </button>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">租赁信息</h2>
          <div className="mt-3 grid gap-2">
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">商品名称</span>
              <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="官方荧光棒" />
            </label>
            <label className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-ink">
              ¥
              <input className="min-w-0 flex-1 outline-none" defaultValue="15" inputMode="numeric" />
              <span className="text-xs text-muted">/ 天</span>
            </label>
            <label className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-ink">
              押金 ¥
              <input className="min-w-0 flex-1 outline-none" defaultValue="100" inputMode="numeric" />
            </label>
            <label className="rounded-2xl border border-line bg-white px-3 py-2">
              <span className="text-xs text-muted">可租日期</span>
              <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="09.10–09.15" />
            </label>
          </div>
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
          <h2 className="text-base font-black text-ink">取还方式</h2>
          <button
            aria-pressed={supportConcertReturn}
            className={cn(
              "mt-3 flex min-h-12 w-full items-center gap-3 rounded-2xl border border-line p-3 text-left text-sm font-bold text-ink",
              supportConcertReturn && "border-brand bg-orange-50 text-brand",
            )}
            type="button"
            onClick={() => setSupportConcertReturn((value) => !value)}
          >
            <span className={cn("grid h-5 w-5 place-items-center rounded-md border border-line", supportConcertReturn && "border-brand bg-brand text-white")}>
              {supportConcertReturn ? <Check size={15} strokeWidth={3} /> : null}
            </span>
            支持演唱会现场取还
          </button>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[390px] border-t border-line bg-white p-3">
        <PrimaryButton className="w-full" onClick={() => setSuccess(true)}>
          发布租赁
        </PrimaryButton>
      </div>

      {success ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={() => setSuccess(false)} />
          <section className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-brand" size={48} />
            <h2 className="mt-4 text-xl font-black text-ink">租赁已发布</h2>
            <p className="mt-2 text-sm leading-6 text-muted">你的租赁物品已经出现在五月天上海站的租赁列表中。</p>
            <PrimaryButton className="mt-5 w-full" href="/events/mayday-shanghai-20260912?tab=rental">
              查看租赁列表
            </PrimaryButton>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
