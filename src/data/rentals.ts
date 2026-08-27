import type { RentalItem } from "@/types";

export const rentals: RentalItem[] = [
  {
    id: "rental-001",
    eventId: "mayday-shanghai-20260912",
    title: "官方荧光棒",
    pricePerDay: 15,
    deposit: 100,
    condition: "9 成新",
    availableFrom: "09.10",
    availableTo: "09.15",
    delivery: ["concert_meetup"],
    ownerName: "晴天",
    ownerCredit: "信用良好",
    description: "功能正常，电池仓干净，适合演唱会现场短期租用。",
    imagePath: "/assets/products/mayday-glowstick-square.jpg",
    meetupPoint: "体育场东门",
    meetupTime: "09.11 17:30–18:00",
  },
  {
    id: "rental-002",
    eventId: "mayday-shanghai-20260912",
    title: "五月天应援服 L 码",
    pricePerDay: 20,
    deposit: 80,
    condition: "8 成新",
    availableFrom: "09.11",
    availableTo: "09.13",
    delivery: ["concert_meetup", "local"],
    ownerName: "小雨",
    ownerCredit: "信用良好",
    description: "L 码短袖，应援色明显，支持现场取还或同城取还。",
    imagePath: "/assets/products/orange-support-shirt-square.jpg",
    meetupPoint: "体育场东门",
    meetupTime: "09.11 17:30–18:00",
  },
  {
    id: "rental-003",
    eventId: "mayday-shanghai-20260912",
    title: "荧光棒收纳套装",
    pricePerDay: 8,
    deposit: 30,
    condition: "9 成新",
    availableFrom: "09.10",
    availableTo: "09.14",
    delivery: ["concert_meetup", "local"],
    ownerName: "橘子汽水",
    ownerCredit: "信用良好",
    description: "包含收纳袋和挂绳，适合临时补齐演唱会装备。",
    meetupPoint: "官方周边区",
    meetupTime: "09.11 17:30–18:00",
  },
];

export function getRentalsByEvent(eventId: string) {
  return rentals.filter((rental) => rental.eventId === eventId);
}

export function getRental(id: string) {
  return rentals.find((rental) => rental.id === id);
}

export function rentalDeliveryText(method: RentalItem["delivery"][number]) {
  return method === "concert_meetup" ? "演唱会现场取还" : "同城取还";
}
