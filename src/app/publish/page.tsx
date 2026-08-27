import Link from "next/link";
import { PackagePlus, Repeat2, Timer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";

const publishTypes = [
  { title: "出闲置", desc: "出掉演唱会后不再需要的物品", icon: PackagePlus, href: "/publish/resale" },
  { title: "换周边", desc: "用你有的换你想要的", icon: Repeat2, href: "/publish/swap" },
  { title: "租物品", desc: "短期租用演唱会所需物品", icon: Timer, href: "/publish/rental" },
];

export default function PublishPage() {
  return (
    <AppShell>
      <TopHeader title="发布" />
      <div className="page-pad">
        <div className="grid gap-3">
          {publishTypes.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-100 text-brand">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-black text-ink">{item.title}</h2>
                  <p className="mt-1 text-xs text-muted">{item.desc}</p>
                </div>
                <span className="shrink-0 text-sm font-black text-brand">&gt;</span>
              </>
            );

            return (
              <Link className="card flex items-center gap-3 p-4" href={item.href} key={item.title}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
