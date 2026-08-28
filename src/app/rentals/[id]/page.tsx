import RentalDetailPageClient from "./RentalDetailPageClient";
import { rentalStaticParams } from "@/lib/staticParams";

type RentalDetailPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return rentalStaticParams();
}

export default function RentalDetailPage({ params }: RentalDetailPageProps) {
  return <RentalDetailPageClient rentalId={params.id} />;
}
