import ExchangeRequestPageClient from "./ExchangeRequestPageClient";
import { exchangeStaticParams } from "@/lib/staticParams";

type ExchangeRequestPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return exchangeStaticParams();
}

export default function ExchangeRequestPage({ params }: ExchangeRequestPageProps) {
  return <ExchangeRequestPageClient exchangeId={params.id} />;
}
