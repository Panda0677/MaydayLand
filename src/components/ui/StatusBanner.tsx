import { Info, Radio } from "lucide-react";
import Link from "next/link";
import type { ConcertEvent } from "@/types";

type StatusBannerProps = {
  event: ConcertEvent;
};

export function StatusBanner({ event }: StatusBannerProps) {
  if (event.phase === "live") {
    return (
      <div className="card border-green-200 bg-green-50 p-4 shadow-none">
        <div className="flex items-start gap-3">
          <Radio className="mt-0.5 text-live" size={19} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-green-800">现场模式已开启</p>
            <p className="mt-1 text-xs text-green-700">326 位乐迷正在现场交易</p>
          </div>
          <Link className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition active:bg-green-700" href={`/events/${event.id}/live`}>
            进入现场
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#FFD8BC] bg-[#FFF3E8] p-4">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 text-brand" size={19} />
        <div>
          <p className="text-sm font-bold text-ink">演出当天开启「现场模式」</p>
          <p className="mt-1 text-xs leading-5 text-muted">届时可发现场馆附近可即时面交的闲置和换物。</p>
        </div>
      </div>
    </div>
  );
}
