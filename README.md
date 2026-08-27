# Encore

演唱会闲置交易平台 Demo。

Encore 围绕同一场演唱会，把闲置购买、周边交换、现场交易和轻量租赁组织在同一个 Event Hub 中。

## 核心 Story

1. Buy：从 Event 闲置商品到确认订单、现场面交和聊天。
2. Swap：结构化交换周边，从交换需求到发起请求和交换聊天。
3. Live：演出当天现场模式，发现附近可即时交易的物品并发布现场求购。

## 本地启动

```bash
npm install
npm run dev
```

默认访问：

```text
http://localhost:3000
```

如果 3000 端口被占用，Next.js 会自动切换到 3001 或其他可用端口，请以终端输出为准。

## 常用入口

```text
/events/mayday-shanghai-20260912
/events/mayday-shanghai-20260912?phase=live
/publish
```

## 质量检查

```bash
npm run typecheck
npm run build
```
