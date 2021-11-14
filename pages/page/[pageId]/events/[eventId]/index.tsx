import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import EventDetails from '@/components/Event/Details/EventDetails';
import { useAuth } from '@/context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { fetchEventDataById } from '@/libs/getEventData';
import { EventData } from '@/utilities/eventItem/types';
import { db } from '../../../../../firebase/firebaseClient';
import RespondToEvent from '@/components/Event/Register/RespondToEvent';

interface Props {
  pageId: string;
  eventData: EventData;
}

export default function Event({ pageId, eventData }: Props) {
  const {
    userData: { linkedPageId, uid },
  } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  let isPageOwner = linkedPageId === pageId ? true : false;

  useEffect(() => {
    if (eventData.id && uid) {
      db.collection('events')
        .doc(eventData.id)
        .collection('teams')
        .where('uids', 'array-contains', uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
              setTeamId(doc.id);
            }
          });
        });
    }
  }, [eventData.id, uid]);

  return (
    <Aux>
      <Head>
        <title>Event</title>
        <meta name="description" content="Details and Registeration" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main
        className={
          'md:w-5/6 lg:w-2/3 mx-auto md:mt-2 ' +
          'relative flex flex-col md:rounded-md ' +
          'bg-gradient-to-b from-gray-900 to-black md:px-10'
        }
      >
        <EventDetails isPageOwner={isPageOwner} data={eventData} />

        {uid ? (
          <RespondToEvent
            pageId={pageId}
            eventData={eventData}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            teamId={teamId}
            setTeamId={setTeamId}
          />
        ) : (
          <section className="mx-auto mt-16">
            <button
              className={
                'w-full rounded-md px-8 py-2 text-xl text-gray-300 font-semibold ' +
                'bg-gray-800/80 hover:bg-gray-900 active:bg-gray-900/50'
              }
              type="button"
              onClick={() => router.push('/auth')}
            >
              Sign in / Sign up to Register
            </button>
          </section>
        )}
      </main>
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  pageId: string;
  eventId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId, eventId } = context.params as IParams;
  const eventData = await fetchEventDataById(eventId);
  return {
    props: {
      eventData,
      pageId,
    },
  };
};
