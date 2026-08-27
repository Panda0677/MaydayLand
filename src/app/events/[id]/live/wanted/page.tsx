"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { getEvent } from "@/data/events";
import { formatEventShortDate } from "@/lib/utils";

export default function LiveWantedPage() {
  const params = useParams<{ id: string }>();
  const event = getEvent(params.id);
  const [success, setSuccess] = useState(false);

  return (
    <AppShell hideBottomNav>
      <TopHeader title="发布现场求购" showBack />
      <div className="space-y-4 p-4 pb-28">
        <section className="card p-4">
          <h1 className="text-base font-black text-ink">我想要</h1>
          <label className="mt-3 block rounded-2xl border border-line bg-white px-3 py-2">
            <span className="text-xs text-muted">名称</span>
            <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="橙色应援 T 恤 L 码" />
          </label>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">预算</h2>
          <label className="mt-3 flex h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-ink">
            ¥
            <input className="min-w-0 flex-1 outline-none" defaultValue="60 以内" />
          </label>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">Event</h2>
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
          <h2 className="text-base font-black text-ink">希望面交点</h2>
          <label className="mt-3 block rounded-2xl border border-line bg-white px-3 py-2">
            <span className="text-xs text-muted">公共面交点</span>
            <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="体育场东门" />
          </label>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">希望时间</h2>
          <label className="mt-3 block rounded-2xl border border-line bg-white px-3 py-2">
            <span className="text-xs text-muted">截止时间</span>
            <input className="mt-1 w-full text-sm font-bold text-ink outline-none" defaultValue="18:00 前" />
          </label>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[390px] border-t border-line bg-white p-3">
        <PrimaryButton className="w-full" onClick={() => setSuccess(true)}>
          发布现场求购
        </PrimaryButton>
      </div>

      {success ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[390px]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 h-full w-full bg-black/30" type="button" aria-label="关闭" onClick={() => setSuccess(false)} />
          <section className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-brand" size={48} />
            <h2 className="mt-4 text-xl font-black text-ink">现场求购已发布</h2>
            <p className="mt-2 text-sm leading-6 text-muted">附近参加同场演唱会的用户现在可以看到你的需求。</p>
            <PrimaryButton className="mt-5 w-full" href={`/events/${params.id}/live`}>
              返回现场模式
            </PrimaryButton>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
