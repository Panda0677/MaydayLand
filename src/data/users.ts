import type { User } from "@/types";

export const users: User[] = [
  {
    id: "seller-milk-tea",
    name: "奶茶妹妹",
    avatar: "/assets/avatars/milktea.jpg",
  },
  {
    id: "swap-owner-blue",
    name: "小蓝",
    avatar: "/assets/avatars/xiaolan.jpg",
  },
  {
    id: "swap-owner-soda",
    name: "汽水",
    avatar: "/assets/avatars/qishui.jpg",
  },
  {
    id: "seller-bag",
    name: "晴天",
    avatar: "/assets/avatars/sunny.jpg",
  },
  {
    id: "community-aming",
    name: "阿明",
    avatar: "/assets/avatars/aming.jpg",
  },
];

export function getUserByName(name: string) {
  return users.find((user) => user.name === name);
}
