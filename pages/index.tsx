import Head from 'next/head';
import EventCard from '../components/Event/EventCard/EventCard';
import { GetServerSideProps } from 'next';
import { fetchAllEventData } from '../libs/getAllEvents';
import { EventData } from '../utilities/eventItem/types';
import Feedback from '@/components/Feedback/Feedback';

interface Props {
  events: EventData[];
}

export default function Home({ events }: Props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Upcoming Esports Events in COD, BGMI and FreeFire. Interested players can register instantly for custom rooms and events."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="mt-10">
        {events.map((eventItem: EventData) => (
          <EventCard key={eventItem.id} data={eventItem} isOrganizer={false} />
        ))}
      </div>
      <Feedback />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await fetchAllEventData();
  return {
    props: {
      events,
    },
  };
};
