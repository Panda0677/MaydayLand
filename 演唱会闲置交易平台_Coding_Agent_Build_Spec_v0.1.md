# 演唱会闲置交易平台 — Coding Agent Build Spec v0.1

> **用途**：直接交给 Coding Agent，用于实现可交互的 Mobile-first Web Demo。  
> **上游依据**：PRD v0.1、核心 User Flow & 页面规格 v0.1、核心页面低保真 Wireframe。  
> **本版本目标**：先做“可点通、逻辑正确、视觉统一”的 Demo，不追求完整后端、复杂算法或生产级风控。

---

## 1. Product Goal

### 1.1 一句话定位
一个围绕**近期热门演唱会 Event**，为乐迷提供闲置出售、结构化交换、短期租赁和演唱会现场面交的 C2C 交易平台。

### 1.2 产品优先级
**交易 > 演唱会场景 > 社区社交**

### 1.3 Demo 必须讲清楚的三个差异点
1. **Event-based Marketplace**：商品不是只按类目组织，而是挂靠到具体演唱会 Event。
2. **结构化交换**：用“我有 / 我想要”表达换物，不依赖自由文本。
3. **现场模式**：演唱会当天可浏览附近可即时面交的出售 / 交换 / 租赁 / 求购。

### 1.4 明确不做
- 票务交易。
- 真实支付、真实物流、真实地图定位。
- 真实推荐算法与热度算法。
- 多人环形交换。
- 租赁损坏仲裁、复杂赔付。
- 完整社区关系链。
- 生产级账号、鉴权、风控、举报后台。

---

## 2. Technical Scope

### 2.1 推荐技术栈
- **Next.js**（App Router）
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** 图标
- React local state / Context 即可
- 不需要数据库
- 不需要真实后端
- Mock Data 存放在本地 TypeScript 文件
- 可使用 `localStorage` 保存少量演示状态（收藏、已发布、订单状态），但不是必须

### 2.2 视觉与终端
- Mobile-first
- 主要参考视口：**390 × 844**
- 桌面浏览器打开时，将 App 居中显示为手机宽度；背景可为浅灰
- 不要做桌面版两栏布局
- 不需要还原系统状态栏，可使用简洁自定义 Header

### 2.3 UI 基调
- 独立品牌，**品牌名暂用 `Encore` 作为占位**，不是最终品牌决策
- 主色：暖橙 / 胡萝卜橙，建议临时 Token：`#FF7A21`
- 背景：`#F7F7F8`
- 卡片：白色
- 主文字：`#171717`
- 次文字：`#6B7280`
- 边框：`#E5E7EB`
- 现场状态可使用少量绿色作为语义色，但不要抢主品牌橙色
- 圆角：12–16px
- 阴影保持克制
- 不使用渐变、3D、复杂装饰
- 商品图片 v0.1 可用灰色/暖色抽象占位图，不依赖真实艺人版权图片

### 2.4 设计原则
- 所有核心页面必须能在 390px 下正常显示
- 固定 Bottom Navigation
- CTA 位置统一
- 相同类型 Card 必须复用同一组件
- 不为每个交互新建页面：筛选、排序、面交点、时间段等优先使用 Bottom Sheet / Modal

---

## 3. Information Architecture

### 3.1 Bottom Navigation
固定五栏：

`首页 | 演唱会 | 发布 | 消息 | 我的`

规则：
- 当前页面高亮对应 Tab
- “发布”为中心操作，可使用更显眼的圆形/橙色按钮
- Event、商品详情、交换详情等二级页面可隐藏 Bottom Nav，优先保证内容空间；返回后恢复

### 3.2 Event 层级
`艺人 → Tour → 城市/日期 → 单场 Event`

单场 Event 是一级业务实体，至少包含：
- artist
- tour
- city
- venue
- datetime
- phase：`preheat | live | afterglow | history`
- heat
- itemCount
- cover / placeholder

---

## 4. Route Map

### P01 首页
`/`

### P02 演唱会列表
`/concerts`

### P03 单场 Event
`/events/mayday-shanghai-20260912`

Tab 使用 query 参数或本地状态：
- `/events/...?...tab=resale`
- `/events/...?...tab=swap`
- `/events/...?...tab=rental`
- `/events/...?...tab=community`

### P04 商品详情
`/products/glow-stick-001`

### P04.1 确认订单
`/checkout/glow-stick-001`

### P04.2 下单成功
`/orders/demo-order-001/success`

### P05 现场模式
`/events/mayday-shanghai-20260912/live`

### P05.1 现场商品详情
`/live/products/shirt-001`

### P06 发布入口
`/publish`

发布类型：
- `/publish/resale`
- `/publish/swap`
- `/publish/rental`

### P07 交换详情
`/exchange/exchange-001`

### P08 发起交换
`/exchange/exchange-001/request`

### P09 消息
`/messages`

### P10 我的
`/me`

### P11 租赁详情（P1）
`/rentals/rental-001`

---

## 5. Mock Data Model

### 5.1 Event
```ts
type EventPhase = "preheat" | "live" | "afterglow" | "history";

type ConcertEvent = {
  id: string;
  artist: string;
  tour: string;
  city: string;
  venue: string;
  datetime: string;
  phase: EventPhase;
  heat: number;
  itemCount: number;
  swapCount?: number;
  attendeeCount?: number;
};
```

### 5.2 Product
```ts
type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: string;
  category: "glowstick" | "clothing" | "merch" | "card" | "poster" | "other";
  eventId: string;
  sellerId: string;
  sellerName: string;
  sellerCredit: string;
  description: string;
  image: string;
  delivery: ("shipping" | "local" | "concert_meetup")[];
  meetupPoint?: string;
  meetupTime?: string;
  distanceMeters?: number;
};
```

### 5.3 Exchange Post
```ts
type ExchangePost = {
  id: string;
  eventId: string;
  ownerName: string;
  ownerCredit: string;
  have: { name: string; qty: number }[];
  want: { name: string; qty: number }[];
  allowCashTopUp: boolean;
  suggestedTopUp?: number;
  delivery: ("shipping" | "local" | "concert_meetup")[];
};
```

### 5.4 Rental
```ts
type RentalItem = {
  id: string;
  eventId: string;
  title: string;
  pricePerDay: number;
  deposit: number;
  availableFrom: string;
  availableTo: string;
  delivery: ("shipping" | "concert_meetup")[];
};
```

### 5.5 Live Listing
```ts
type LiveListing = {
  id: string;
  type: "resale" | "swap" | "rental" | "wanted";
  title: string;
  price?: number;
  distanceMeters: number;
  meetupPoint: string;
  availableUntil: string;
  eventId: string;
};
```

---

## 6. Global Components

优先做以下可复用组件：

1. `AppShell`
2. `TopHeader`
3. `BottomNav`
4. `SearchBar`
5. `EventCard`
6. `EventHeader`
7. `EventTabs`
8. `CategoryChips`
9. `FilterChip`
10. `ProductCard`
11. `ExchangeCard`
12. `RentalCard`
13. `LiveListingCard`
14. `SellerCard`
15. `PrimaryButton`
16. `SecondaryButton`
17. `BottomSheet`
18. `EmptyState`
19. `StatusBanner`
20. `MeetupPointSelector`
21. `TimeSlotSelector`

原则：
- 先做组件，再拼页面
- 不允许复制粘贴出多个视觉略不同的 ProductCard / Button

---

# 7. Page Specification

## P01 — 首页 `/`

### 页面目的
让用户快速发现近期热门演唱会，同时保留“打开就能逛货”的二手交易氛围。

### 页面结构
1. 顶部品牌 / 搜索框
2. 近期热门演唱会横滑区
3. “猜你喜欢”商品区
4. 商品双列瀑布流
5. Bottom Nav

### 热门 Event Card 至少展示
- 艺人
- 城市
- 日期
- 热度或“X 万人正在关注”
- 状态：即将开演 / 现场中 / 余热期

### 核心交互
- 点击 Event → P03
- 点击商品 → P04
- 点击搜索 → 简单搜索态即可，不要求真实搜索算法
- Bottom Nav → 对应一级页

### 状态
- Normal
- Empty（没有推荐商品）
- Search active（可简化为输入框过滤 Mock Data）

### Acceptance
- 3 秒内能看懂“这是演唱会闲置交易平台”
- Event 比普通商品拥有更高的信息层级
- 商品仍占据首页主要浏览面积

---

## P02 — 演唱会列表 `/concerts`

### 页面目的
集中发现近期热门或即将开演的 Event。

### 模块
- Header：演唱会
- Tabs：热门 / 即将开演
- Event Card 列表
- Bottom Nav

### Event Card
- 艺人 / Tour
- 城市 / 场馆
- 日期
- 热度
- 闲置数量
- Event phase

### 交互
点击 Event → P03

---

## P03 — 单场 Event `/events/:id`

### 页面目的
作为单场演唱会的交易枢纽，聚合出售、交换、租赁与广场内容。

### Header 区
必须使用**单场日期**，不能使用多日日期范围。

示例：
- 五月天【回到那一天】上海站
- 上海体育场
- 2026.09.12（周六）19:00
- 12.8 万人关注 · 3.2 万件闲置

### 关键状态区
三个信息块：
- 距离演出：5 天
- 现场模式：未开启 / 已开启
- 官方周边区：入口指引

### 现场模式规则
**preheat**
- 文案：演出当天开启「现场模式」
- 不显示“去开启”
- 可显示弱按钮“了解现场模式”或不显示 CTA

**live**
- Banner：现场模式已开启
- 文案：326 位乐迷正在现场交易
- CTA：`进入现场`
- 点击 → P05

### Event Tabs
固定：
- 闲置
- 交换
- 租赁
- 广场

“找搭子 / 攻略”属于广场内容类型，不是 Event 一级 Tab。

### 闲置 Tab
- 分类：全部 / 荧光棒 / 服装 / 周边 / 卡片 / 海报 / 更多
- Filters：默认排序 / 可现场面交 / 价格 / 筛选
- 商品双列列表
- 点击商品 → P04

### 交换 Tab
不跳新一级页面，保持 P03 外壳：
- 搜索框（可选）
- Chips：全部 / 我有 / 我想要 / 可加价
- `ExchangeCard`
- 点击卡片 → P07

### 租赁 Tab
- RentalCard 列表
- ¥ / 天
- 押金
- 可租日期
- 点击 → P11

### 广场 Tab
仅需 Demo 级内容流：
- 晒物
- 穿搭
- 找搭子
- 攻略
- 现场信息
- 帖子可展示“关联商品”小卡
不做复杂社区详情页。

### Bottom Nav
Event 页可保留 Bottom Nav，“演唱会”高亮。

### Acceptance
- Event 是页面绝对主角
- 4 个 Tab 与 PRD 完全一致
- 不出现顶部第二个“发布”入口
- 现场模式在 preheat / live 状态下逻辑一致

---

## P04 — 商品详情 `/products/:id`

### 页面目的
让用户判断商品是否值得购买，并进入交易流程。

### 模块
1. 返回 / 更多
2. 商品图片 Carousel（v0.1 可只有 1–3 张 placeholder）
3. 标题、价格、标签
4. 成色、数量
5. 所属 Event
6. Seller Card
7. 商品描述
8. 交付方式标签
9. 固定底部操作栏

### 交付方式标签
- 快递
- 同城面交
- 演唱会现场面交

### 底部 CTA
- 聊一聊
- 收藏
- 立即购买

### 交互
- Event 标签 → P03
- 聊一聊 → P09（可以直接进入 demo chat）
- 立即购买 → P04.1

### Acceptance
- “所属 Event”必须明显，不得隐藏在描述尾部
- “演唱会现场面交”必须作为结构化交付方式出现

---

## P04.1 — 确认订单 `/checkout/:productId`

### 页面目的
完成 Demo 核心购买路径，重点体现演唱会现场面交。

### 模块
1. 商品摘要
2. 交付方式 Radio
   - 快递
   - 同城面交
   - 演唱会现场面交
3. 选择面交点
4. 选择时间段
5. 金额摘要
6. 提交订单

### 面交点
使用 Bottom Sheet：
- 体育场东门
- 地铁站 2 号口
- 官方周边区
- 附近商场 / 咖啡店

不要展示卖家精确实时位置。

### 时间段
Bottom Sheet / segmented selection：
- 17:00–17:30
- 17:30–18:00
- 18:00–18:30

### 交互
提交订单 → P04.2

### Acceptance
- 现场面交是正常交易方式之一，不是备注字段
- 面交点与时间是结构化选择

---

## P04.2 — 下单成功

### 模块
- Success icon
- “下单成功”
- 订单摘要
- 面交点 / 时间
- CTA：`去聊天`
- CTA：`查看订单`

### 交互
去聊天 → P09

---

## P05 — 现场模式 `/events/:id/live`

### 页面目的
演出当天浏览场馆附近可以即时完成的交易。

### Header
- Event 标题
- `现场模式已开启`
- “326 位乐迷正在现场交易”

### Filters
- 全部
- 出售
- 交换
- 租赁
- 求购
- 距离 / 价格可用 Bottom Sheet

### Listing Card 必须突出
- 类型
- 标题
- 价格（如有）
- 约 XX m
- 公共面交点
- XX:XX 前可面交

示例：
`橙色应援 T L码 / ¥60 / 约 350m / 体育场东门 / 18:00 前`

### 空状态
没有合适结果时：
- 文案：没有找到合适的现场供给
- CTA：`发布现场求购`

### 交互
- 点击出售商品 → P05.1
- 点击交换 → P07
- 发布求购 → 可复用 P06 的简化 Sheet

### Acceptance
- 第一视觉感受必须是“即时、附近、现场”
- 不展示地图上的精确个人位置

---

## P05.1 — 现场商品详情

### 与 P04 的区别
增加：
- 距离
- 当前公共面交点
- 可面交截止时间
- “演出当天可面交”状态

### CTA
- 现在联系
- 我要买

---

## P06 — 发布入口 `/publish`

### 页面目的
作为全局唯一发布入口。

### 三个入口
1. 出闲置
2. 换周边
3. 租物品

### 规则
所有发布类型都必须关联 Event。

### 出闲置表单
- 图片
- 标题
- 描述
- 价格
- 成色
- Event
- 交付方式

### 换周边表单
- 我有（1–N 件）
- 我想要（1–N 件）
- 是否接受补差价
- Event
- 交换方式

### 租赁表单
- 图片
- 标题
- ¥ / 天
- 押金
- 可租日期
- Event
- 取还方式

### Demo 交互
无需真实上传，选择 placeholder 后即可提交。
提交后显示 Success Toast / Modal。

---

## P07 — 交换详情 `/exchange/:id`

### 页面目的
让用户判断双方需求是否匹配。

### 模块
- 我有
- 我想要
- 是否接受补差价
- Event
- 交换方式
- 用户信用
- CTA：聊一聊 / 我可以换

### 交互
我可以换 → P08

---

## P08 — 发起交换 `/exchange/:id/request`

### 页面目的
结构化发起一次 1 对 1 交换请求。

### 模块
1. 对方想要
2. 选择“我的交换物”
3. 是否补差价
4. 交换方式
5. 提交

### 我的交换物
Mock：
- 阿信限定卡
- 荧光棒挂件

### 补差价
- 不加价
- 加价
- 选择加价后显示金额输入

### 交换方式
- 演唱会现场交换（推荐）
- 同城交换
- 快递互寄

### 交互
提交 → Success Modal → 去聊天 P09

### Acceptance
- 不支持多人交换
- 不需要实现复杂撮合算法

---

## P09 — 消息 `/messages`

### Demo 级即可
三类：
- 聊天
- 交易消息
- 社区互动

至少准备 3 条 Mock：
1. “这个今晚体育场东门可以面交吗？”
2. “对方接受了你的交换请求”
3. “你的订单已创建”

点击第一条进入简单 Chat View：
- 对方气泡
- 自己气泡
- 输入框
无需实时网络。

---

## P10 — 我的 `/me`

### 模块
- 头像 / 昵称 / 信用
- 我买到的
- 我卖出的
- 我的交换
- 我的租赁
- 我的发布
- 收藏
- 参与的演唱会

Demo 只需要可视化入口，不要求所有入口均有详情页。

---

## P11 — 租赁详情（P1）

### 模块
- 图片 / 标题
- ¥15 / 天
- 押金 ¥100
- 日期选择
- 取还方式
- 金额计算
- CTA：确认租赁

### 状态
`待取货 → 租赁中 → 待归还 → 已完成`

不做仲裁 / 损坏赔付。

---

# 8. Core Demo Stories

## Story A — Buy
必须完整点通：

`P01 首页 → P03 Event → 闲置商品 → P04 商品详情 → P04.1 现场面交 → P04.2 成功 → P09 聊天`

### Demo 目标
证明 Event Marketplace + 现场履约成立。

---

## Story B — Swap
必须完整点通：

`P03 Event → 交换 Tab → P07 交换详情 → P08 我可以换 → Success → P09 聊天`

### Demo 目标
证明结构化交换是独立产品能力。

---

## Story C — Live
必须完整点通：

`P03（live phase）→ P05 现场模式 → P05.1 现场商品 → 联系 / 购买`

### Demo 目标
证明 Event + Time + Location 的独特价值。

---

## Story D — Rental（P1）
只需基本可点：

`P03 → 租赁 Tab → P11 → 日期选择 → 确认`

不要求深入订单管理。

---

# 9. Bottom Sheet / Modal Boundaries

以下全部不需要独立 Route：

- 筛选
- 排序
- 价格
- 分类“更多”
- 面交点选择
- 时间段选择
- 租赁日期
- 发布成功
- 交换请求成功
- 收藏成功
- 删除 / 举报确认（如果实现）

统一使用一个可复用 `BottomSheet` / `Dialog` 组件。

---

# 10. State Matrix

核心页面至少考虑：

### Loading
使用轻量 Skeleton，可选。

### Empty
- P01：暂无推荐
- P03 交换：暂无交换
- P05：附近暂无供给 → 发布现场求购
- Messages：暂无消息

### Selected
- Tab active
- Filter Chip active
- 收藏 active
- 交付方式 selected

### Success
- 下单成功
- 发布成功
- 交换请求成功

### Disabled
- preheat 阶段不能进入真实现场模式
- 不可租日期禁用

### Expired
可选：
- Event history
- 现场 listing 已过可面交时间

---

# 11. Mock Content

## Event 1 — 主演示 Event
- 艺人：五月天
- Tour：回到那一天
- 城市：上海
- 场馆：上海体育场
- 日期：2026.09.12 19:00
- 热度：98.6 万
- 关注：12.8 万
- 闲置：3.2 万
- Demo 时可将 `phase` 配为 `live`，方便展示现场模式

## Event 2
- 周杰伦
- 杭州
- 即将开演

## Event 3
- 林俊杰
- 北京
- 即将开演

## Product
1. 官方荧光棒（几乎全新）¥89，可现场面交
2. 橙色应援 T 恤 L 码 ¥60，可现场面交
3. 荧光棒收纳袋 ¥25
4. 五月天限定海报 ¥30，只支持快递

## Exchange
- 对方有：怪兽限定卡 ×1
- 对方想要：阿信限定卡 ×1
- 允许补差价

## Rental
- 官方荧光棒
- ¥15 / 天
- 押金 ¥100

---

# 12. Recommended File Structure

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ concerts/
│  ├─ events/[id]/
│  ├─ products/[id]/
│  ├─ checkout/[id]/
│  ├─ orders/[id]/success/
│  ├─ exchange/[id]/
│  ├─ publish/
│  ├─ messages/
│  └─ me/
├─ components/
│  ├─ layout/
│  ├─ cards/
│  ├─ event/
│  ├─ commerce/
│  ├─ sheets/
│  └─ ui/
├─ data/
│  ├─ events.ts
│  ├─ products.ts
│  ├─ exchanges.ts
│  ├─ rentals.ts
│  └─ messages.ts
├─ lib/
│  └─ utils.ts
└─ types/
   └─ index.ts
```

---

# 13. Implementation Priority

## Phase 1 — Skeleton
先完成：
- AppShell
- BottomNav
- Mock Data
- Routes
- P01 / P03 / P04

验收：
页面能正常跳转，移动端布局无明显错误。

## Phase 2 — Buy Story
完成：
- P04.1
- BottomSheet
- 面交点
- 时间段
- P04.2
- Chat

验收：
Story A 全链路能点通。

## Phase 3 — Swap Story
完成：
- P03 Swap Tab
- P07
- P08
- Success
- Chat

验收：
Story B 全链路能点通。

## Phase 4 — Live Story
完成：
- P05
- P05.1
- Live filters
- Empty → 发布现场求购

验收：
Story C 全链路能点通。

## Phase 5 — Supporting
完成：
- Publish
- Messages
- Me
- Rental
- Community placeholder

## Phase 6 — Polish
只在逻辑全部正确后：
- Typography
- Spacing
- 动效
- Skeleton
- hover / active
- 更换占位图
- 响应式细节

---

# 14. Global Acceptance Criteria

Demo 交付前必须满足：

- [ ] 390px 视口下无横向滚动。
- [ ] 首页 3 秒内能看懂“演唱会 + 闲置交易”。
- [ ] P03 只展示单场 Event，不使用日期范围表示多场。
- [ ] P03 只有“闲置 / 交换 / 租赁 / 广场”四个 Tab。
- [ ] 现场模式 preheat / live 两种状态逻辑正确。
- [ ] “发布”只有一个全局主入口。
- [ ] 商品详情明确展示所属 Event。
- [ ] 现场面交是结构化交付方式。
- [ ] 面交点只使用公共地点，不展示卖家精确定位。
- [ ] 交换是“我有 / 我想要”结构化数据。
- [ ] 三条核心 Story 均可从头点到尾。
- [ ] 所有核心 Button / Card / Chip 视觉一致。
- [ ] 非核心交互优先 Bottom Sheet / Modal，避免页面爆炸。
- [ ] 不实现票务交易。
- [ ] 不依赖真实后端即可运行。
- [ ] `npm run build`（或项目对应 build 命令）可以成功执行。

---

# 15. Coding Agent Working Rules

实现时请严格遵循：

1. **先实现逻辑，再优化视觉。**
2. 不要自行扩展需求，例如票务、地图、复杂社交、AI 推荐。
3. 不要因为“看起来更完整”而增加未定义页面。
4. 低保真 Wireframe 只作为布局参考；如与本 Build Spec 冲突，以本 Spec 为准。
5. 所有页面使用统一 Mock Data，不要每页写互相矛盾的数据。
6. 每完成一个 Phase，先确保主流程可用，再进入下一 Phase。
7. 若某个需求存在歧义，选择**更简单、可演示、可维护**的实现。
8. 保持代码组件化，但不要为 Demo 过度工程化。
9. 页面文案使用简体中文。
10. 优先保证手机浏览器和桌面浏览器中的手机框展示体验。

---

# 16. First Coding Task

请 Coding Agent 首先完成：

> **Phase 1 + Phase 2，只做 Buy Story。**

具体交付：
1. 初始化项目。
2. 建立 Mock Data。
3. 实现 P01 首页。
4. 实现 P03 Event 闲置 Tab。
5. 实现 P04 商品详情。
6. 实现 P04.1 确认订单。
7. 实现面交点 / 时间段 Bottom Sheet。
8. 实现 P04.2 下单成功。
9. 实现最简 Chat。
10. 跑通：
   `首页 → 五月天 Event → 荧光棒 → 现场面交 → 下单成功 → 去聊天`
11. 完成后再请求产品 Review，不要自行继续实现 Swap / Live。

---

## Build Spec v0.1 End
