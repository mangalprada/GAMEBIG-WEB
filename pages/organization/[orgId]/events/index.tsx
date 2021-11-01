import Head from 'next/head';
import HeaderOrg from '../../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import EventCard from '../../../../components/Event/EventCard/EventCard';
import CreateEventButton from '../../../../components/Event/CreateEvent/CreateEventButton';
import { OrgFormData } from '../../../../utilities/organization/types';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { fetchOrganizationData } from '../../../../libs/fetchOrganizationData';
import { fetchEventsDataByOrgId } from '../../../../libs/getAllEvents';
import { EventData } from '../../../../utilities/eventItem/types';

interface Props {
  organizationData: OrgFormData | undefined;
  events: EventData[];
}

export default function Events({ organizationData, events }: Props) {
  return (
    <Aux>
      <Head>
        <title>Create an Event</title>
        <meta
          name="description"
          content="List of all upcoming events on GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {organizationData ? (
        <>
          <HeaderOrg data={organizationData} />
          {organizationData.id && (
            <CreateEventButton orgId={organizationData.id} />
          )}
          {events.map((eventItem: EventData) => (
            <EventCard
              key={eventItem.id}
              data={eventItem}
              isOrganizer={false}
            />
          ))}
        </>
      ) : (
        <div>Network Error</div>
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId } = context.params as IParams;
  let organizationData = undefined;
  organizationData = await fetchOrganizationData(orgId);
  let events = await fetchEventsDataByOrgId(orgId);
  events = events === undefined ? [] : events;
  return {
    props: {
      organizationData,
      events,
    },
  };
};
