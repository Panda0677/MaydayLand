import type { CommunityPost } from "@/types";

export const communityPosts: CommunityPost[] = [
  {
    id: "post-001",
    eventId: "mayday-shanghai-20260912",
    type: "穿搭",
    authorName: "奶油橙",
    title: "上海站有人准备穿这套橙色应援吗？",
    content: "天气好像挺热，准备短袖 + 橙色配饰。",
    likes: 128,
    comments: 32,
    hasImage: true,
    imagePath: "/assets/products/orange-support-shirt-square.jpg",
    linkedProductId: "shirt-001",
  },
  {
    id: "post-002",
    eventId: "mayday-shanghai-20260912",
    type: "找搭子",
    authorName: "阿明",
    title: "9.12 上海站看台区有没有一起去的？",
    content: "看台 A 区，一个人去，想找同场搭子。",
    likes: 42,
    comments: 18,
  },
  {
    id: "post-003",
    eventId: "mayday-shanghai-20260912",
    type: "晒物",
    authorName: "小蓝",
    title: "终于集齐这一套限定卡了！",
    content: "开场前快乐加倍，准备带去现场交换几张重复卡。",
    likes: 96,
    comments: 21,
    hasImage: true,
    imagePath: "/assets/cards/mayday-card-c.jpg",
  },
  {
    id: "post-004",
    eventId: "mayday-shanghai-20260912",
    type: "攻略",
    authorName: "橙子地图",
    title: "上海体育场入场前注意事项整理",
    content: "建议提前到场，优先选择公共交通，随身物品尽量轻便。",
    likes: 210,
    comments: 45,
  },
  {
    id: "post-005",
    eventId: "mayday-shanghai-20260912",
    type: "现场",
    authorName: "前线小报",
    title: "官方周边区现在排队大约 30 分钟",
    content: "周边区人流稳定，建议预留取物和入场时间。",
    likes: 73,
    comments: 11,
  },
];

export function getCommunityPostsByEvent(eventId: string) {
  return communityPosts.filter((post) => post.eventId === eventId);
}
