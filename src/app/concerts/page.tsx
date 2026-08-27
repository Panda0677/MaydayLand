import { AppShell } from "@/components/layout/AppShell";
import { TopHeader } from "@/components/layout/TopHeader";
import { EventCard } from "@/components/cards/EventCard";
import { FilterChip } from "@/components/ui/FilterChip";
import { events } from "@/data/events";

export default function ConcertsPage() {
  return (
    <AppShell>
      <TopHeader title="演唱会" />
      <div className="page-pad">
        <div className="mb-4 flex gap-2">
          <FilterChip active>热门</FilterChip>
          <FilterChip>即将开演</FilterChip>
        </div>
        <div className="grid gap-4">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
