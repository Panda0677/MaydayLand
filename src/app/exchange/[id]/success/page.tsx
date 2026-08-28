import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { getEvent } from "@/data/events";
import { getExchange } from "@/data/exchanges";
import SwapSuccessPageClient from "./SwapSuccessPageClient";
import { exchangeStaticParams } from "@/lib/staticParams";

type SwapSuccessPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return exchangeStaticParams();
}

export default function SwapSuccessPage({ params }: SwapSuccessPageProps) {
  const exchange = getExchange(params.id);
  const event = exchange ? getEvent(exchange.eventId) : undefined;
  if (!exchange || !event) notFound();

  return (
    <Suspense
      fallback={
        <AppShell hideBottomNav>
          <TopHeader showBack />
          <div className="page-pad text-sm text-muted">加载交换结果中...</div>
        </AppShell>
      }
    >
      <SwapSuccessPageClient exchangeId={params.id} />
    </Suspense>
  );
}
