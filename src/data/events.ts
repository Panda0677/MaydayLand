import type { ConcertEvent } from "@/types";

export const events: ConcertEvent[] = [
  {
    id: "mayday-shanghai-20260912",
    artist: "五月天",
    tour: "回到那一天",
    city: "上海",
    venue: "上海体育场",
    datetime: "2026-09-12T19:00:00+08:00",
    phase: "preheat",
    heat: 986000,
    itemCount: 32000,
    swapCount: 4200,
    attendeeCount: 128000,
    coverImage: "/assets/concerts/mayday-shanghai-cover.jpg",
  },
  {
    id: "jaychou-hangzhou-20261003",
    artist: "周杰伦",
    tour: "嘉年华",
    city: "杭州",
    venue: "杭州奥体中心体育场",
    datetime: "2026-10-03T19:30:00+08:00",
    phase: "preheat",
    heat: 746000,
    itemCount: 18000,
    coverImage: "/assets/concerts/jay-hangzhou.jpg",
  },
  {
    id: "jjlin-beijing-20261018",
    artist: "林俊杰",
    tour: "JJ20",
    city: "北京",
    venue: "国家体育场",
    datetime: "2026-10-18T19:00:00+08:00",
    phase: "preheat",
    heat: 612000,
    itemCount: 14600,
    coverImage: "/assets/concerts/jj-beijing.jpg",
  },
];

export function getEvent(id: string) {
  return events.find((event) => event.id === id);
}
