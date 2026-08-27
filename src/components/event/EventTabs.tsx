import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = ["闲置", "交换", "租赁", "广场"];

type EventTabsProps = {
  active?: string;
  eventId: string;
};

export function EventTabs({ active = "闲置", eventId }: EventTabsProps) {
  return (
    <div className="sticky top-[52px] z-10 -mx-4 border-b border-line bg-page/95 px-4 backdrop-blur">
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const enabled = true;
          const href =
            tab === "交换"
              ? `/events/${eventId}?tab=swap`
              : tab === "租赁"
                ? `/events/${eventId}?tab=rental`
                : tab === "广场"
                  ? `/events/${eventId}?tab=community`
                  : `/events/${eventId}`;
          const className = cn(
            "relative flex h-12 items-center justify-center text-sm font-bold text-muted",
            tab === active && "text-ink after:absolute after:inset-x-5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand",
            !enabled && "opacity-45",
          );

          if (!enabled) {
            return (
              <button className={className} disabled key={tab} type="button">
                {tab}
              </button>
            );
          }

          return (
            <Link className={className} href={href} key={tab} replace scroll={false}>
              {tab}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
