import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import OrderSuccessPageClient from "./OrderSuccessPageClient";
import { orderSuccessStaticParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return orderSuccessStaticParams();
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <AppShell hideBottomNav>
          <TopHeader showBack />
          <div className="page-pad text-sm text-muted">加载订单中...</div>
        </AppShell>
      }
    >
      <OrderSuccessPageClient />
    </Suspense>
  );
}
