import type { DeliveryMethod, EventPhase } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCompactWan(value: number) {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value >= 100000 ? 1 : 0)} 万`;
  }
  return `${value}`;
}

export function formatEventDate(datetime: string) {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(date);
}

export function formatEventFullDate(datetime: string) {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  })
    .format(date)
    .replaceAll("/", ".");
}

export function formatEventShortDate(datetime: string) {
  const date = new Date(datetime);
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    timeZone: "Asia/Shanghai",
  }).formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value ?? "09";
  const day = parts.find((part) => part.type === "day")?.value ?? "12";
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "周六";
  return `${month}.${day}（${weekday}）`;
}

export function phaseText(phase: EventPhase) {
  const map: Record<EventPhase, string> = {
    preheat: "即将开演",
    live: "现场中",
    afterglow: "余热期",
    history: "已结束",
  };
  return map[phase];
}

export function deliveryText(method: DeliveryMethod) {
  const map: Record<DeliveryMethod, string> = {
    shipping: "快递",
    local: "同城面交",
    concert_meetup: "演唱会现场面交",
  };
  return map[method];
}

export function swapDeliveryText(method: DeliveryMethod) {
  const map: Record<DeliveryMethod, string> = {
    shipping: "快递互寄",
    local: "同城交换",
    concert_meetup: "演唱会现场交换",
  };
  return map[method];
}
