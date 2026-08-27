import type { ExchangePost } from "@/types";

const cardImages = {
  monster: "/assets/cards/monster-card.jpg",
  ashin: "/assets/cards/ashin-card.jpg",
  set: "/assets/cards/mayday-card-c.jpg",
};

export const exchanges: ExchangePost[] = [
  {
    id: "exchange-001",
    eventId: "mayday-shanghai-20260912",
    ownerId: "swap-owner-blue",
    ownerName: "小蓝",
    ownerCredit: "信用良好",
    have: [{ name: "怪兽限定卡", qty: 1, imagePath: cardImages.monster }],
    want: [{ name: "阿信限定卡", qty: 1, imagePath: cardImages.ashin }],
    allowCashTopUp: true,
    delivery: ["concert_meetup", "local", "shipping"],
  },
  {
    id: "exchange-002",
    eventId: "mayday-shanghai-20260912",
    ownerId: "swap-owner-soda",
    ownerName: "汽水",
    ownerCredit: "信用良好",
    have: [{ name: "阿信限定卡", qty: 1, imagePath: cardImages.ashin }],
    want: [{ name: "怪兽限定卡", qty: 1, imagePath: cardImages.monster }],
    allowCashTopUp: true,
    suggestedTopUp: 20,
    delivery: ["concert_meetup", "local"],
  },
  {
    id: "exchange-003",
    eventId: "mayday-shanghai-20260912",
    ownerId: "swap-owner-cloud",
    ownerName: "云朵",
    ownerCredit: "信用优秀",
    have: [{ name: "普通卡", qty: 2, imagePath: cardImages.set }],
    want: [{ name: "限定卡", qty: 1, imagePath: cardImages.monster }],
    allowCashTopUp: false,
    delivery: ["concert_meetup", "shipping"],
  },
];

export const myExchangeItems = [
  { id: "my-card-ashin", name: "阿信限定卡", qty: 1, imagePath: cardImages.ashin, recommended: true },
  { id: "my-charm", name: "荧光棒挂件", qty: 1, recommended: false },
];

export function getExchange(id: string) {
  return exchanges.find((exchange) => exchange.id === id);
}

export function getExchangesByEvent(eventId: string) {
  return exchanges.filter((exchange) => exchange.eventId === eventId);
}

export function formatExchangeItems(items: Array<{ name: string; qty: number }>) {
  return items.map((item) => `${item.name} ×${item.qty}`).join("、");
}
