import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getEvent } from "@/data/events";
import { getProduct } from "@/data/products";
import { formatEventShortDate } from "@/lib/utils";

type SuccessPageProps = {
  searchParams: { product?: string; point?: string; time?: string };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const query = searchParams;
  const product = getProduct(query.product ?? "shirt-001");
  const event = product ? getEvent(product.eventId) : undefined;
  const point = query.point ?? "体育场东门";
  const time = query.time ?? "17:30–18:00";
  const chatParams = new URLSearchParams({
    chat: "demo-order-001",
    product: product?.id ?? "shirt-001",
    point,
    time,
  });

  return (
    <AppShell hideBottomNav>
      <TopHeader showBack />
      <div className="space-y-4 p-4">
        <section className="card grid justify-items-center p-7 text-center">
          <CheckCircle2 size={54} className="text-brand" />
          <h1 className="mt-4 text-2xl font-black text-ink">下单成功</h1>
          <p className="mt-2 text-sm leading-6 text-muted">请在聊天中与卖家确认面交细节</p>
          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <PrimaryButton href={`/messages?${chatParams.toString()}`}>去聊天</PrimaryButton>
            <SecondaryButton href="/me">查看订单</SecondaryButton>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-base font-black text-ink">订单摘要</h2>
          <dl className="mt-3 grid grid-cols-[86px_1fr] gap-y-3 text-sm">
            <dt className="text-muted">商品</dt>
            <dd className="text-right font-bold text-ink">{product?.title ?? "橙色应援 T 恤 L 码"}</dd>
            <dt className="text-muted">金额</dt>
            <dd className="text-right font-bold text-brand">¥{product?.price ?? 60}</dd>
            <dt className="text-muted">演唱会</dt>
            <dd className="text-right font-bold text-ink">
              {event ? `${event.artist}【${event.tour}】${event.city}站` : "五月天【回到那一天】上海站"}
            </dd>
            <dt className="text-muted">交付方式</dt>
            <dd className="text-right font-bold text-ink">演唱会现场面交</dd>
            <dt className="text-muted">面交点</dt>
            <dd className="text-right font-bold text-ink">{point}</dd>
            <dt className="text-muted">面交时间</dt>
            <dd className="text-right font-bold text-ink">{event ? `${formatEventShortDate(event.datetime)}${time}` : `09.12（周六）${time}`}</dd>
          </dl>
        </section>

        <Link className="block text-center text-sm font-bold text-brand" href="/">
          返回首页
        </Link>
      </div>
    </AppShell>
  );
}
