import { ContentList } from "@/components/ContentList";
import { Card} from "@/components/Card";
import { CardProps } from "@/types";

import { getContentBySlug } from "@/data/loaders";
import { EventProps } from "@/types";
import { notFound } from "next/navigation";
import { EventSignupForm } from "@/components/EventSignupForm";

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProp {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; query?: string }>
}

const EventCard = (props : Readonly<CardProps>) => <Card {...props} basePath="events" />;

export default async function AllEventsRoute({
  params,
  searchParams,
}: ParamsProp) {

  const slug = (await params).slug;
  const {query, page} = await searchParams;
  const {event, blocks} = await loader(slug);

  return (
    <div className="container">
      <div className="event-page">
        <EventSignupForm blocks={blocks} eventId={event.documentId} />
      </div>
      <ContentList
        headline="All Events"
        path="/api/events"
        query={query}
        page={page}
        showSearch
        showPagination
        component={EventCard} />
    </div>
  );
}