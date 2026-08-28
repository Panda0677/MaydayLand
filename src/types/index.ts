export type EventPhase = "preheat" | "live" | "afterglow" | "history";

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type ConcertEvent = {
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
  coverImage?: string;
};

export type DeliveryMethod = "shipping" | "local" | "concert_meetup";

export type Product = {
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
  imagePath?: string;
  delivery: DeliveryMethod[];
  meetupPoint?: string;
  meetupTime?: string;
  distanceMeters?: number;
};

export type ExchangeItem = {
  name: string;
  qty: number;
  imagePath?: string;
};

export type ExchangePost = {
  id: string;
  eventId: string;
  ownerId: string;
  ownerName: string;
  ownerCredit: string;
  have: ExchangeItem[];
  want: ExchangeItem[];
  allowCashTopUp: boolean;
  suggestedTopUp?: number;
  delivery: DeliveryMethod[];
};

export type RentalItem = {
  id: string;
  eventId: string;
  title: string;
  pricePerDay: number;
  deposit: number;
  condition: string;
  availableFrom: string;
  availableTo: string;
  delivery: ("local" | "concert_meetup")[];
  ownerName: string;
  ownerCredit: string;
  description?: string;
  imagePath?: string;
  meetupPoint?: string;
  meetupTime?: string;
};

export type LiveListing = {
  id: string;
  type: "resale" | "swap" | "rental" | "wanted";
  title: string;
  price?: number;
  priceLabel?: string;
  distanceMeters: number;
  meetupPoint: string;
  availableUntil: string;
  eventId: string;
  sellerName?: string;
  description?: string;
  relatedId?: string;
  imagePath?: string;
};

export type CommunityPost = {
  id: string;
  eventId: string;
  type: "晒物" | "穿搭" | "找搭子" | "攻略" | "现场";
  authorName: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  hasImage?: boolean;
  imagePath?: string;
  linkedProductId?: string;
};
