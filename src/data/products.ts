import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "glow-stick-001",
    title: "官方荧光棒（几乎全新）",
    price: 89,
    originalPrice: 129,
    condition: "9 成新",
    category: "glowstick",
    eventId: "mayday-shanghai-20260912",
    sellerId: "seller-orange",
    sellerName: "小橘子",
    sellerCredit: "信用良好",
    description: "官方正版荧光棒，只在彩排试亮过一次，功能完好。支持演出当天公共地点面交，可当场验货。",
    image: "orange-glow",
    imagePath: "/assets/products/mayday-glowstick-square.jpg",
    delivery: ["shipping", "local", "concert_meetup"],
    meetupPoint: "体育场东门",
    meetupTime: "17:30–18:00",
    distanceMeters: 350,
  },
  {
    id: "shirt-001",
    title: "橙色应援 T 恤 L 码",
    price: 60,
    originalPrice: 99,
    condition: "8 成新",
    category: "clothing",
    eventId: "mayday-shanghai-20260912",
    sellerId: "seller-milk-tea",
    sellerName: "奶茶妹妹",
    sellerCredit: "信用良好",
    description: "只穿过一次，成色很好，适合现场应援。支持现场验货和公共地点面交。",
    image: "shirt",
    imagePath: "/assets/products/orange-support-shirt-square.jpg",
    delivery: ["local", "concert_meetup"],
    meetupPoint: "体育场东门",
    meetupTime: "18:00 前",
    distanceMeters: 250,
  },
  {
    id: "bag-001",
    title: "荧光棒收纳袋",
    price: 25,
    condition: "全新",
    category: "merch",
    eventId: "mayday-shanghai-20260912",
    sellerId: "seller-bag",
    sellerName: "晴天",
    sellerCredit: "信用优秀",
    description: "全新未拆，适合装荧光棒和小周边。",
    image: "bag",
    imagePath: "/assets/products/glowstick-bag.jpg",
    delivery: ["shipping", "concert_meetup"],
  },
  {
    id: "poster-001",
    title: "五月天限定海报",
    price: 30,
    condition: "轻微卷边",
    category: "poster",
    eventId: "mayday-shanghai-20260912",
    sellerId: "seller-poster",
    sellerName: "阿信信箱",
    sellerCredit: "信用良好",
    description: "收藏海报一张，边角有轻微卷边，只支持快递。",
    image: "poster",
    imagePath: "/assets/products/mayday-poster.jpg",
    delivery: ["shipping"],
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByEvent(eventId: string) {
  return products.filter((product) => product.eventId === eventId);
}
