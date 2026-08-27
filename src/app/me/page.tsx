import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";

const entries = ["我买到的", "我卖出的", "我的交换", "我的租赁", "我的发布", "收藏", "参与的演唱会"];

export default function MePage() {
  return (
    <AppShell>
      <TopHeader title="我的" />
      <div className="page-pad">
        <section className="card flex items-center gap-3 p-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-orange-100 text-lg font-black text-brand">我</div>
          <div>
            <h1 className="text-lg font-black text-ink">Encore 乐迷</h1>
            <p className="mt-1 text-sm text-muted">信用良好</p>
          </div>
        </section>
        <div className="mt-4 grid gap-2">
          {entries.map((entry) => (
            <div className="card flex h-12 items-center justify-between px-4 text-sm font-bold text-ink" key={entry}>
              {entry}
              <span className="text-muted">›</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
