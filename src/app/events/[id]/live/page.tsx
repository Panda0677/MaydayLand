import LiveEventPageClient from "./LiveEventPageClient";
import { eventStaticParams } from "@/lib/staticParams";

type LiveEventPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return eventStaticParams();
}

export default function LiveEventPage({ params }: LiveEventPageProps) {
  return <LiveEventPageClient eventId={params.id} />;
}
