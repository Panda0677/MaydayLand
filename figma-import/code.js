const FONT = { family: "Inter", style: "Regular" };
const FONT_MEDIUM = { family: "Inter", style: "Medium" };
const FONT_BOLD = { family: "Inter", style: "Bold" };

const C = {
  bg: rgb(248, 248, 248),
  phone: rgb(255, 255, 255),
  line: rgb(218, 218, 218),
  text: rgb(31, 31, 31),
  muted: rgb(118, 118, 118),
  faint: rgb(238, 238, 238),
  chip: rgb(245, 245, 245),
  dark: rgb(70, 70, 70),
  accent: rgb(255, 116, 30),
  live: rgb(232, 246, 236)
};

function rgb(r, g, b) {
  return { r: r / 255, g: g / 255, b: b / 255 };
}

function solid(color) {
  return [{ type: "SOLID", color }];
}

function stroke(color = C.line, weight = 1) {
  return { strokes: solid(color), strokeWeight: weight };
}

function text(parent, value, x, y, size = 12, width = 100, weight = FONT, color = C.text) {
  const node = figma.createText();
  node.fontName = weight;
  node.characters = value;
  node.fontSize = size;
  node.fills = solid(color);
  node.lineHeight = { unit: "AUTO" };
  node.resize(width, Math.max(size + 6, 18));
  node.x = x;
  node.y = y;
  parent.appendChild(node);
  return node;
}

function frame(parent, name, x, y, w, h, fill = C.phone, radius = 0) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = solid(fill);
  node.cornerRadius = radius;
  node.clipsContent = false;
  parent.appendChild(node);
  return node;
}

function box(parent, name, x, y, w, h, fill = C.faint, radius = 8, border = true) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = solid(fill);
  node.cornerRadius = radius;
  if (border) Object.assign(node, stroke(C.line));
  parent.appendChild(node);
  return node;
}

function pill(parent, value, x, y, w, h = 28, selected = false) {
  box(parent, "Chip / " + value, x, y, w, h, selected ? C.text : C.phone, h / 2);
  text(parent, value, x + 12, y + 6, 12, w - 24, FONT_MEDIUM, selected ? C.phone : C.text);
}

function placeholder(parent, x, y, w, h, label = "") {
  box(parent, "Image Placeholder", x, y, w, h, C.faint, 8);
  text(parent, label || "X", x + w / 2 - 10, y + h / 2 - 10, 18, 20, FONT, C.muted);
}

function nav(parent, title, more = "") {
  text(parent, "<", 16, 18, 22, 24, FONT, C.text);
  text(parent, title, 56, 21, 14, 250, FONT_BOLD, C.text);
  if (more) text(parent, more, 322, 20, 14, 40, FONT_MEDIUM, C.text);
}

function caption(page, title, x, y) {
  text(page, title, x, y, 16, 260, FONT_BOLD, C.text);
}

function phone(page, title, x, y, h = 760) {
  caption(page, title, x, y - 34);
  const p = frame(page, title, x, y, 390, h, C.phone, 12);
  Object.assign(p, stroke(C.line));
  text(p, "9:41", 26, 14, 13, 52, FONT_BOLD, C.text);
  text(p, "◼︎  WiFi  ▰", 298, 14, 11, 76, FONT, C.text);
  return p;
}

function tabs(parent, items, activeIndex, y) {
  const w = 390 / items.length;
  items.forEach((item, i) => {
    text(parent, item, i * w + 22, y, 14, w - 44, i === activeIndex ? FONT_BOLD : FONT, C.text);
  });
  box(parent, "Active Tab Underline", activeIndex * w + 28, y + 28, w - 56, 3, C.text, 2, false);
}

function productCard(parent, x, y, title, price, tag = "可现场面交") {
  const card = frame(parent, "商品卡 / " + title, x, y, 170, 246, C.phone, 8);
  Object.assign(card, stroke(C.line));
  pill(card, tag, 8, 8, 82, 24);
  text(card, "♡", 136, 8, 24, 26, FONT, C.text);
  placeholder(card, 8, 32, 154, 122);
  text(card, title, 10, 164, 14, 142, FONT_BOLD, C.text);
  text(card, price, 10, 190, 18, 80, FONT_BOLD, C.text);
  text(card, "上海体育场东门可面交", 10, 218, 11, 142, FONT, C.muted);
  return card;
}

function listItem(parent, x, y, title, price, meta) {
  const row = frame(parent, "列表项 / " + title, x, y, 330, 82, C.phone, 8);
  Object.assign(row, stroke(C.line));
  placeholder(row, 10, 10, 56, 62);
  text(row, title, 78, 14, 13, 168, FONT_BOLD, C.text);
  text(row, price, 286, 14, 13, 36, FONT_BOLD, C.text);
  text(row, meta, 78, 42, 11, 190, FONT, C.muted);
  return row;
}

function option(parent, x, y, label, selected = false, sub = "") {
  const row = frame(parent, "选项 / " + label, x, y, 330, sub ? 58 : 38, C.phone, 7);
  Object.assign(row, stroke(selected ? C.text : C.line));
  text(row, selected ? "●" : "○", 12, 10, 13, 20, FONT, C.text);
  text(row, label, 36, 10, 13, 250, FONT_MEDIUM, C.text);
  if (sub) text(row, sub, 36, 31, 11, 250, FONT, C.muted);
  return row;
}

function actions(parent, y, primary = "立即购买", secondary = "聊一聊") {
  box(parent, "Footer Bar", 0, y, 390, 68, C.phone, 0);
  pill(parent, secondary, 24, y + 14, 100, 40);
  box(parent, "Primary Button / " + primary, 252, y + 14, 112, 40, C.dark, 8, false);
  text(parent, primary, 276, y + 25, 13, 70, FONT_BOLD, C.phone);
}

function buildComponents(page, x, y) {
  text(page, "可复制组件", x, y, 18, 180, FONT_BOLD, C.text);
  text(page, "从这里复制到画板，或直接编辑任意页面内模块", x, y + 28, 12, 260, FONT, C.muted);

  const c1 = figma.createComponent();
  c1.name = "Component / 商品卡";
  c1.x = x;
  c1.y = y + 68;
  c1.resize(170, 246);
  c1.fills = solid(C.phone);
  c1.cornerRadius = 8;
  Object.assign(c1, stroke(C.line));
  page.appendChild(c1);
  productCard(c1, 0, 0, "商品标题", "¥88");

  const c2 = figma.createComponent();
  c2.name = "Component / 列表项";
  c2.x = x + 210;
  c2.y = y + 68;
  c2.resize(330, 82);
  c2.fills = solid(C.phone);
  page.appendChild(c2);
  listItem(c2, 0, 0, "附近商品", "¥60", "约300m | 可面交");

  const c3 = figma.createComponent();
  c3.name = "Component / 筛选胶囊组";
  c3.x = x;
  c3.y = y + 350;
  c3.resize(330, 44);
  c3.fills = solid(C.phone);
  page.appendChild(c3);
  pill(c3, "默认排序⌄", 0, 8, 96);
  pill(c3, "可现场面交", 108, 8, 112);
  pill(c3, "筛选▽", 232, 8, 82);

  const c4 = figma.createComponent();
  c4.name = "Component / 单选项";
  c4.x = x;
  c4.y = y + 420;
  c4.resize(330, 58);
  c4.fills = solid(C.phone);
  page.appendChild(c4);
  option(c4, 0, 0, "演唱会现场面交", true, "演出当天在公约地点面交");
}

function p01(page, x, y) {
  const p = phone(page, "P01 首页", x, y, 760);
  box(p, "Search", 24, 46, 282, 32, C.phone, 16);
  text(p, "搜索演唱会、艺人、物品", 44, 54, 12, 190, FONT, C.muted);
  text(p, "♧", 336, 52, 16, 24, FONT, C.text);
  text(p, "近期热门演唱会", 24, 106, 15, 180, FONT_BOLD, C.text);
  text(p, "更多 >", 310, 106, 12, 52, FONT, C.text);
  ["五月天\n上海站\n05.01", "周杰伦\n杭州站\n05.10", "林俊杰\n北京站\n05.16", "张学友\n广州站\n05.20"].forEach((item, i) => {
    const c = frame(p, "演唱会卡片", 24 + i * 82, 136, 72, 122, C.phone, 8);
    Object.assign(c, stroke(C.line));
    placeholder(c, 6, 6, 60, 58);
    text(c, item, 8, 72, 11, 56, FONT_BOLD, C.text);
  });
  text(p, "为你推荐", 24, 286, 15, 120, FONT_BOLD, C.text);
  tabs(p, ["全部", "闲置", "交换", "租赁"], 0, 318);
  productCard(p, 24, 372, "官方荧光棒", "¥89");
  productCard(p, 198, 372, "橙色应援T恤 L码", "¥60");
  box(p, "Bottom Nav", 0, 700, 390, 60, C.phone, 0);
  text(p, "首页      演唱会      发布      消息      我的", 36, 720, 12, 320, FONT_BOLD, C.text);
}

function p03Idle(page, x, y) {
  const p = phone(page, "P03 单场 Event 页（闲置 Tab）", x, y, 900);
  nav(p, "五月天【回到那一天】上海站", "↗ ⋯");
  placeholder(p, 24, 70, 88, 88);
  text(p, "五月天【回到那一天】上海站", 128, 72, 18, 224, FONT_BOLD, C.text);
  text(p, "上海体育场 | 2026.05.01 周五 19:00", 128, 106, 12, 232, FONT, C.text);
  text(p, "12.8万人想去 · 3.2万件宝贝", 128, 134, 12, 220, FONT, C.muted);
  const info = frame(p, "演出信息栏", 24, 182, 342, 76, C.phone, 8);
  Object.assign(info, stroke(C.line));
  text(info, "5天后演出\n05.01 周五 19:00", 18, 15, 12, 92, FONT_BOLD, C.text);
  text(info, "现场模式未开启\n演出当天开启", 130, 15, 12, 98, FONT_BOLD, C.text);
  text(info, "官方周边区\n东广场入口", 260, 15, 12, 72, FONT_BOLD, C.text);
  box(p, "现场模式提示", 24, 278, 342, 54, C.phone, 8);
  text(p, "演出当天开启「现场模式」", 68, 288, 13, 190, FONT_BOLD, C.text);
  text(p, "查看附近正在交易的物品", 68, 310, 11, 180, FONT, C.muted);
  box(p, "Accent Dot", 40, 294, 18, 18, C.accent, 9, false);
  tabs(p, ["闲置", "交换", "租赁", "广场"], 0, 360);
  ["全部", "荧光棒", "服装", "周边", "卡片", "海报", "更多"].forEach((c, i) => pill(p, c, 20 + i * 52, 420, 44, 44, i === 0));
  pill(p, "默认排序⌄", 24, 486, 92);
  pill(p, "可现场面交 ○", 132, 486, 116);
  pill(p, "价格⌄", 264, 486, 72);
  productCard(p, 24, 540, "官方荧光棒（几乎全新）", "¥89");
  productCard(p, 198, 540, "橙色应援 T 恤 L码", "¥60");
}

function p04(page, x, y) {
  const p = phone(page, "P04 商品详情页", x, y, 760);
  nav(p, "", "⋯");
  placeholder(p, 0, 46, 390, 230);
  pill(p, "1/5", 326, 236, 42, 22, true);
  text(p, "官方荧光棒（几乎全新）", 24, 300, 18, 260, FONT_BOLD, C.text);
  text(p, "¥89", 24, 330, 20, 80, FONT_BOLD, C.text);
  pill(p, "可现场面交", 24, 366, 88);
  pill(p, "包邮（快递）", 122, 366, 90);
  text(p, "成色                                      9成新\n数量                                      1件\n演唱会        五月天【回到那一天】上海站", 24, 416, 12, 320, FONT, C.text);
  box(p, "Seller", 24, 512, 342, 56, C.phone, 8);
  box(p, "Avatar", 38, 526, 28, 28, C.faint, 14);
  text(p, "小橘子", 78, 528, 13, 80, FONT_BOLD, C.text);
  pill(p, "信用良好", 170, 526, 70, 24);
  pill(p, "关注", 300, 520, 50);
  text(p, "商品描述", 24, 598, 14, 90, FONT_BOLD, C.text);
  text(p, "官方正版荧光棒，演出当天使用一次，功能完好。", 24, 626, 12, 316, FONT, C.text);
  actions(p, 692, "立即购买", "聊一聊");
}

function p041(page, x, y) {
  const p = phone(page, "P04.1 确认订单页", x, y, 760);
  nav(p, "确认订单");
  const op = frame(p, "订单商品", 24, 72, 342, 74, C.phone, 0);
  placeholder(op, 0, 0, 58, 58);
  text(op, "官方荧光棒（几乎全新）", 72, 4, 13, 190, FONT_BOLD, C.text);
  text(op, "¥89", 72, 28, 13, 80, FONT_BOLD, C.text);
  text(op, "卖家：小橘子", 72, 50, 11, 120, FONT, C.muted);
  text(p, "选择交付方式", 24, 176, 14, 120, FONT_BOLD, C.text);
  option(p, 24, 208, "快递寄送（包邮）");
  option(p, 24, 254, "同城面交（上海）");
  option(p, 24, 300, "演唱会现场面交", true, "演出当天在公约地点面交");
  text(p, "选择面交地点", 24, 392, 14, 120, FONT_BOLD, C.text);
  ["体育场东门（推荐）                 约350m", "地铁站2号口                         约500m", "官方周边区                          约650m"].forEach((v, i) => {
    box(p, "地点选项", 24, 424 + i * 38, 342, 36, C.phone, 7);
    text(p, v, 38, 434 + i * 38, 12, 300, FONT, C.text);
  });
  text(p, "选择时间段", 24, 556, 14, 120, FONT_BOLD, C.text);
  pill(p, "17:00 - 17:30", 24, 588, 100);
  pill(p, "17:30 - 18:00", 132, 588, 108);
  pill(p, "18:00 - 18:30", 248, 588, 108);
  box(p, "Order Bar", 0, 692, 390, 68, C.phone, 0);
  text(p, "合计 ¥89", 24, 714, 16, 100, FONT_BOLD, C.text);
  box(p, "Submit", 262, 704, 104, 40, C.dark, 8, false);
  text(p, "提交订单", 286, 715, 13, 60, FONT_BOLD, C.phone);
}

function p042(page, x, y) {
  const p = phone(page, "P04.2 订单成功页", x, y, 760);
  nav(p, "");
  text(p, "下单成功", 156, 94, 18, 90, FONT_BOLD, C.text);
  box(p, "Success Icon", 170, 134, 50, 50, C.phone, 25);
  text(p, "✓", 184, 144, 28, 30, FONT_BOLD, C.text);
  text(p, "您的订单已提交", 136, 206, 15, 120, FONT_BOLD, C.text);
  text(p, "请在聊天中与卖家确认面交细节", 104, 234, 12, 190, FONT, C.muted);
  box(p, "Chat", 54, 286, 132, 40, C.dark, 8, false);
  text(p, "去聊天", 98, 297, 13, 50, FONT_BOLD, C.phone);
  box(p, "Order", 204, 286, 132, 40, C.phone, 8);
  text(p, "查看订单", 244, 297, 13, 60, FONT_BOLD, C.text);
  text(p, "订单信息", 24, 374, 14, 100, FONT_BOLD, C.text);
  text(p, "商品                 官方荧光棒（几乎全新）\n金额                                      ¥89\n交付方式                       演唱会现场面交\n面交地点                             体育场东门\n时间段                         05.01 17:30-18:00", 24, 414, 12, 330, FONT, C.text);
  box(p, "提示", 24, 590, 342, 78, C.phone, 8);
  text(p, "提示", 40, 604, 13, 80, FONT_BOLD, C.text);
  text(p, "演出当天请提前到达面交地点，注意安全，愉快观演！", 40, 630, 12, 270, FONT, C.text);
}

function p03Exchange(page, x, y) {
  const p = phone(page, "P03（交换 Tab）", x, y, 760);
  nav(p, "五月天【回到那一天】上海站");
  tabs(p, ["闲置", "交换", "租赁", "广场"], 1, 82);
  box(p, "Search", 24, 136, 330, 32, C.phone, 16);
  text(p, "搜索我想要的周边", 42, 144, 12, 160, FONT, C.muted);
  pill(p, "全部", 24, 190, 52, 28, true);
  pill(p, "我有", 86, 190, 52, 28);
  pill(p, "我想要", 148, 190, 68, 28);
  pill(p, "可加价", 226, 190, 68, 28);
  exchangeCard(p, 24, 242, "怪兽限定卡 × 1", "阿信限定卡 × 1");
  exchangeCard(p, 24, 382, "阿信限定卡 × 1", "怪兽限定卡 × 1 + ¥20");
}

function exchangeCard(parent, x, y, have, want) {
  const c = frame(parent, "交换卡片", x, y, 342, 116, C.phone, 8);
  Object.assign(c, stroke(C.line));
  text(c, "我有", 12, 12, 11, 30, FONT, C.muted);
  text(c, have, 58, 12, 13, 180, FONT_BOLD, C.text);
  pill(c, "可直接换", 260, 8, 66, 24);
  placeholder(c, 12, 50, 42, 42);
  text(c, "想要", 12, 94, 11, 30, FONT, C.muted);
  text(c, want, 58, 66, 13, 210, FONT_BOLD, C.text);
  text(c, "›", 316, 64, 18, 14, FONT, C.text);
}

function p031(page, x, y) {
  const p = phone(page, "P03.1 交换详情页", x, y, 760);
  text(p, "我有", 24, 58, 14, 80, FONT_BOLD, C.text);
  cardLine(p, 24, 88, "怪兽限定卡 × 1");
  text(p, "想要", 24, 188, 14, 80, FONT_BOLD, C.text);
  cardLine(p, 24, 218, "阿信限定卡 × 1");
  text(p, "交换方式                         演唱会现场交换\n可加价                                      ¥0", 24, 326, 12, 310, FONT, C.text);
  box(p, "Seller", 24, 430, 342, 56, C.phone, 8);
  box(p, "Avatar", 38, 444, 28, 28, C.faint, 14);
  text(p, "小蓝", 78, 446, 13, 80, FONT_BOLD, C.text);
  pill(p, "信用良好", 264, 444, 74);
  actions(p, 692, "我可以换", "聊一聊");
}

function cardLine(parent, x, y, label) {
  const row = frame(parent, "物品行 / " + label, x, y, 342, 74, C.phone, 8);
  Object.assign(row, stroke(C.line));
  placeholder(row, 12, 12, 50, 50);
  text(row, label, 80, 28, 13, 180, FONT_BOLD, C.text);
}

function p0311(page, x, y) {
  const p = phone(page, "P03.1.1 发起交换页", x, y, 760);
  nav(p, "发起交换");
  text(p, "选择我的交换物", 24, 74, 14, 120, FONT_BOLD, C.text);
  option(p, 24, 106, "阿信限定卡 × 1", true);
  option(p, 24, 152, "荧光棒挂件 × 1");
  text(p, "是否加价", 24, 228, 14, 120, FONT_BOLD, C.text);
  option(p, 24, 260, "不加价", true);
  option(p, 24, 306, "加价");
  text(p, "交换方式", 24, 382, 14, 120, FONT_BOLD, C.text);
  option(p, 24, 414, "演唱会现场交换（推荐）", true);
  option(p, 24, 460, "同城交换（上海）");
  option(p, 24, 506, "快递互寄");
  box(p, "Submit", 24, 678, 342, 44, C.dark, 8, false);
  text(p, "发起交换请求", 150, 690, 14, 100, FONT_BOLD, C.phone);
}

function p05(page, x, y) {
  const p = phone(page, "P05 现场模式页（演出当天）", x, y, 760);
  nav(p, "五月天【回到那一天】上海站");
  box(p, "现场模式已开启", 24, 70, 342, 64, C.live, 8);
  text(p, "现场模式已开启", 54, 82, 14, 160, FONT_BOLD, C.text);
  text(p, "326位乐迷正在现场交易", 54, 106, 12, 180, FONT, C.text);
  text(p, "附近物品（按距离）", 24, 164, 14, 150, FONT_BOLD, C.text);
  listItem(p, 24, 202, "橙色应援T恤 L码", "¥60", "约250m | 18:00前可面交");
  listItem(p, 24, 296, "官方荧光棒", "¥80", "约300m | 18:30前可面交");
  listItem(p, 24, 390, "周边手幅", "¥15", "约450m | 19:00前可面交");
}

function p051(page, x, y) {
  const p = phone(page, "P05.1 现场商品详情页", x, y, 760);
  nav(p, "", "⋯");
  placeholder(p, 0, 46, 390, 230);
  pill(p, "1/4", 326, 236, 42, 22, true);
  text(p, "橙色应援T恤 L码", 24, 300, 18, 200, FONT_BOLD, C.text);
  text(p, "¥60", 24, 330, 20, 80, FONT_BOLD, C.text);
  text(p, "约250m | 体育场东门", 24, 366, 12, 190, FONT, C.muted);
  pill(p, "演出当天可面交", 24, 394, 112);
  pill(p, "个人出租出售", 146, 394, 100);
  box(p, "Seller", 24, 464, 342, 56, C.phone, 8);
  box(p, "Avatar", 38, 478, 28, 28, C.faint, 14);
  text(p, "卖家", 78, 480, 13, 80, FONT_BOLD, C.text);
  text(p, "奶茶妹妹", 156, 480, 12, 80, FONT, C.text);
  text(p, "商品描述", 24, 556, 14, 100, FONT_BOLD, C.text);
  text(p, "只穿过一次，成色很好，支持现场验货。", 24, 584, 12, 280, FONT, C.text);
  actions(p, 692, "我想要", "现在联系");
}

function p06(page, x, y) {
  const p = phone(page, "P06 发布入口页", x, y, 760);
  nav(p, "发布");
  text(p, "选择你要发布的类型", 24, 76, 13, 160, FONT, C.muted);
  publish(p, 24, 126, "出售闲置", "卖掉不用的物品", "□");
  publish(p, 24, 220, "交换周边", "我有 / 我想要", "✣");
  publish(p, 24, 314, "租赁物品", "短期出租 / 借用", "▤");
}

function publish(parent, x, y, title, desc, icon) {
  const c = frame(parent, "发布类型 / " + title, x, y, 342, 72, C.phone, 8);
  Object.assign(c, stroke(C.line));
  box(c, "Icon", 20, 18, 36, 36, C.phone, 18);
  text(c, icon, 31, 27, 15, 20, FONT, C.text);
  text(c, title, 76, 18, 14, 140, FONT_BOLD, C.text);
  text(c, desc, 76, 42, 12, 150, FONT, C.muted);
  text(c, "›", 310, 26, 18, 14, FONT, C.text);
}

async function main() {
  await figma.loadFontAsync(FONT);
  await figma.loadFontAsync(FONT_MEDIUM);
  await figma.loadFontAsync(FONT_BOLD);

  const page = figma.createPage();
  page.name = "演唱会闲置交易平台 / 低保真原型";
  await figma.setCurrentPageAsync(page);

  const bg = frame(page, "低保真原型画布", -80, -90, 5060, 1960, C.bg, 0);
  bg.locked = true;

  text(page, "演唱会闲置交易平台 | 核心页面低保真原型", 0, -58, 24, 680, FONT_BOLD, C.text);
  text(page, "低保真结构稿：页面、卡片、列表、按钮均为 Figma 原生图层，可直接拖动和修改。", 0, -20, 13, 720, FONT, C.muted);

  buildComponents(page, 4180, 0);

  const gapX = 430;
  const gapY = 960;
  p01(page, 0, 40);
  p03Idle(page, gapX, 40);
  p04(page, gapX * 2, 40);
  p041(page, gapX * 3, 40);
  p042(page, gapX * 4, 40);
  p03Exchange(page, 0, gapY);
  p031(page, gapX, gapY);
  p0311(page, gapX * 2, gapY);
  p05(page, gapX * 3, gapY);
  p051(page, gapX * 4, gapY);
  p06(page, gapX * 5, gapY);

  figma.viewport.scrollAndZoomIntoView(page.children.filter((node) => node.type !== "FRAME" || node.name !== "低保真原型画布"));
  figma.closePlugin("已生成 11 个低保真页面和基础组件。");
}

main();
