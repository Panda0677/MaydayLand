import { events } from "@/data/events";
import { exchanges } from "@/data/exchanges";
import { liveListings } from "@/data/liveListings";
import { products } from "@/data/products";
import { rentals } from "@/data/rentals";

export function eventStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export function productStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function exchangeStaticParams() {
  return exchanges.map((exchange) => ({ id: exchange.id }));
}

export function rentalStaticParams() {
  return rentals.map((rental) => ({ id: rental.id }));
}

export function liveRentalStaticParams() {
  return liveListings.filter((listing) => listing.type === "rental").map((listing) => ({ id: listing.id }));
}

export function orderSuccessStaticParams() {
  return [{ id: "demo-order-001" }];
}
