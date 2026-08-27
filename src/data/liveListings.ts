import type { LiveListing } from "@/types";

export type LiveListingFilter = "all" | LiveListing["type"];
export type LiveDistanceFilter = "500m" | "1km" | "all";
export type LiveTimeFilter = "all" | "18:00" | "18:30";

export const liveListings: LiveListing[] = [
  {
    id: "live-resale-shirt-001",
    eventId: "mayday-shanghai-20260912",
    type: "resale",
    title: "橙色应援 T 恤 L 码",
    price: 60,
    distanceMeters: 350,
    meetupPoint: "体育场东门",
    availableUntil: "18:00 前可面交",
    sellerName: "奶茶妹妹",
    description: "8 成新，适合现场应援。人在体育场附近，可在公共面交点当场验货。",
    relatedId: "shirt-001",
    imagePath: "/assets/products/orange-support-shirt-square.jpg",
  },
  {
    id: "live-swap-card-001",
    eventId: "mayday-shanghai-20260912",
    type: "swap",
    title: "怪兽限定卡 ↔ 阿信限定卡",
    priceLabel: "交换",
    distanceMeters: 180,
    meetupPoint: "地铁站 2 号口",
    availableUntil: "18:30 前可交换",
    sellerName: "小蓝",
    relatedId: "exchange-001",
  },
  {
    id: "live-rental-lightstick-001",
    eventId: "mayday-shanghai-20260912",
    type: "rental",
    title: "官方荧光棒",
    priceLabel: "¥15 / 天",
    distanceMeters: 450,
    meetupPoint: "官方周边区",
    availableUntil: "19:00 前可取",
    sellerName: "晴天",
    description: "现场短租荧光棒，演出后按约定归还。建议在公共面交点当面确认物品状态。",
    relatedId: "rental-lightstick-001",
    imagePath: "/assets/products/mayday-glowstick-square.jpg",
  },
  {
    id: "live-wanted-shirt-001",
    eventId: "mayday-shanghai-20260912",
    type: "wanted",
    title: "急求 L 码橙色应援服",
    priceLabel: "¥60 以内",
    distanceMeters: 420,
    meetupPoint: "体育场附近公共区域",
    availableUntil: "18:00 截止",
    sellerName: "木木",
    description: "希望在开场前找到 L 码橙色应援服。",
    relatedId: "wanted-shirt-001",
    imagePath: "/assets/products/orange-support-shirt-square.jpg",
  },
];

export function getLiveListingsByEvent(eventId: string) {
  return liveListings.filter((listing) => listing.eventId === eventId);
}

export function getLiveListing(id: string) {
  return liveListings.find((listing) => listing.id === id);
}

export function liveListingTypeText(type: LiveListing["type"]) {
  const map: Record<LiveListing["type"], string> = {
    resale: "出售",
    swap: "交换",
    rental: "租赁",
    wanted: "求购",
  };
  return map[type];
}

export function liveListingPriceText(listing: LiveListing) {
  if (listing.priceLabel) return listing.priceLabel;
  if (typeof listing.price === "number") return `¥${listing.price}`;
  return "";
}

export function liveDistanceText(distanceMeters: number) {
  return `约 ${distanceMeters}m`;
}

export function liveTimeRank(availableUntil: string) {
  if (availableUntil.includes("18:00")) return 1800;
  if (availableUntil.includes("18:30")) return 1830;
  if (availableUntil.includes("19:00")) return 1900;
  return 9999;
}
