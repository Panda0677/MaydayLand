import LiveWantedPageClient from "./LiveWantedPageClient";
import { eventStaticParams } from "@/lib/staticParams";

type LiveWantedPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return eventStaticParams();
}

export default function LiveWantedPage({ params }: LiveWantedPageProps) {
  return <LiveWantedPageClient eventId={params.id} />;
}
