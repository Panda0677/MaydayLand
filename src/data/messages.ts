export type MessageThread = {
  id: string;
  title: string;
  preview: string;
  type: string;
  unread: boolean;
  kind: "chat" | "swap" | "live" | "rental" | "notification";
  productId?: string;
  exchangeId?: string;
  rentalId?: string;
  liveListingId?: string;
  mine?: string;
  swapStatus?: "pending" | "accepted";
  point?: string;
  time?: string;
};

export const messageThreads: MessageThread[] = [
  {
    id: "demo-order-001",
    title: "奶茶妹妹",
    preview: "9 月 12 日演出当天可以在体育场东门面交吗？",
    type: "聊天",
    unread: true,
    kind: "chat",
    productId: "shirt-001",
    point: "体育场东门",
    time: "17:30–18:00",
  },
  {
    id: "exchange-accepted",
    title: "交易消息",
    preview: "对方接受了你的交换请求",
    type: "交易消息",
    unread: false,
    kind: "swap",
    exchangeId: "exchange-001",
    mine: "阿信限定卡 ×1",
    swapStatus: "accepted",
    point: "体育场东门",
    time: "17:30–18:00",
  },
  {
    id: "rental-001",
    title: "晴天",
    preview: "9 月 11 日现场取方便吗？",
    type: "租赁",
    unread: false,
    kind: "rental",
    rentalId: "rental-001",
    point: "体育场东门",
    time: "09.11 17:30–18:00",
  },
  {
    id: "live-shirt-001",
    title: "奶茶妹妹",
    preview: "我已经到体育场附近了，现在可以面交吗？",
    type: "现场交易",
    unread: false,
    kind: "live",
    productId: "shirt-001",
    liveListingId: "live-resale-shirt-001",
    point: "体育场东门",
    time: "18:00 前可面交",
  },
  {
    id: "live-wanted",
    title: "木木",
    preview: "还在找 L 码橙色应援服吗？",
    type: "现场求购",
    unread: false,
    kind: "live",
    liveListingId: "live-wanted-shirt-001",
    point: "体育场附近公共区域",
    time: "18:00 截止",
  },
  {
    id: "order-created",
    title: "系统通知",
    preview: "你的订单已创建",
    type: "交易消息",
    unread: false,
    kind: "notification",
    productId: "shirt-001",
    point: "体育场东门",
    time: "17:30–18:00",
  },
];
