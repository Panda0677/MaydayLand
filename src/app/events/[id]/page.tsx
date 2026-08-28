import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { getEvent } from "@/data/events";
import EventPageClient from "./EventPageClient";
import { eventStaticParams } from "@/lib/staticParams";

type EventPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return eventStaticParams();
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEvent(params.id);
  if (!event) notFound();

  return (
    <Suspense
      fallback={
        <AppShell>
          <TopHeader title={`${event.artist}${event.city}站`} showBack />
          <div className="page-pad text-sm text-muted">加载演唱会中...</div>
        </AppShell>
      }
    >
      <EventPageClient eventId={params.id} />
    </Suspense>
  );
}
