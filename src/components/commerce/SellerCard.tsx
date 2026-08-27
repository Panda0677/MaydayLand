import { ShieldCheck } from "lucide-react";
import type { Product } from "@/types";

type SellerCardProps = {
  product: Product;
};

export function SellerCard({ product }: SellerCardProps) {
  return (
    <section className="card flex items-center gap-3 p-4">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-sm font-black text-brand">
        {product.sellerName.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-ink">{product.sellerName}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <ShieldCheck size={14} className="text-brand" />
          {product.sellerCredit}
        </p>
      </div>
      <button className="h-9 rounded-full border border-line px-3 text-xs font-bold text-ink" type="button">
        关注
      </button>
    </section>
  );
}
