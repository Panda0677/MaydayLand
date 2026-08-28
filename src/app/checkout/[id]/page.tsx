import { Suspense } from "react";
import CheckoutPageClient from "./CheckoutPageClient";
import { productStaticParams } from "@/lib/staticParams";

type CheckoutPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return productStaticParams();
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  return (
    <Suspense fallback={null}>
      <CheckoutPageClient productId={params.id} />
    </Suspense>
  );
}
