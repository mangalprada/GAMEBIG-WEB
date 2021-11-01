import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import EventDetails from '../../../../../components/Event/Details/EventDetails';
import ParticipantList from '../../../../../components/Event/ParticipantList/ParticipantList';
import RegisterEventForm from '../../../../../components/Event/Register/RegisterEventForm';
import SendNotification from '../../../../../components/Event/Notification/SendNotification';
import { useAuth } from '../../../../../context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { fetchEventDataById } from '../../../../../libs/getEventData';
import { EventData } from '../../../../../utilities/eventItem/types';
import SnackbarAlert from '@/components/UI/Snackbar/SnackBar';
import SoloRegistrationForm from '../../../../../components/Event/Register/SoloRegistrationForm';
import { db } from '../../../../../firebase/firebaseClient';
import router from 'next/router';

interface Props {
  orgId: string;
  eventData: EventData;
}

export default function Event({ orgId, eventData }: Props) {
  const {
    userData: { linkedOrganizationId, username },
  } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  let isOrganizer = linkedOrganizationId === orgId ? true : false;

  useEffect(() => {
    if (eventData.id && username) {
      db.collection('events')
        .doc(eventData.id)
        .collection('teams')
        .where('usernames', 'array-contains', username)
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
  }, [eventData.id, username]);

  const unregisterHandler = () => {
    db.collection('events')
      .doc(eventData.id)
      .collection('teams')
      .doc(teamId)
      .delete();
    router.push('/');
  };

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
          'md:w-5/6 lg:w-2/3 mx-auto mt-2 ' +
          'relative flex flex-col md:rounded-md ' +
          'bg-gradient-to-b from-gray-900 to-black md:px-10'
        }
      >
        <EventDetails isOrganizer={isOrganizer} data={eventData} />
        {isOrganizer ? (
          <div>
            <SendNotification eventData={eventData} />
            <ParticipantList tId={eventData.id} />
          </div>
        ) : (
          (null as any)
        )}
        {!isRegistered ? (
          {
            Squad: (
              <RegisterEventForm
                teamSize={4}
                setTeamId={setTeamId}
                setIsAlertOpen={() => setIsAlertOpen(true)}
                gameCode={eventData.gameCode}
                eventId={eventData.id}
                setIsRegistered={setIsRegistered}
              />
            ),
            Duo: (
              <RegisterEventForm
                teamSize={2}
                setTeamId={setTeamId}
                setIsAlertOpen={() => setIsAlertOpen(true)}
                gameCode={eventData.gameCode}
                eventId={eventData.id}
                setIsRegistered={setIsRegistered}
              />
            ),
            Solo: (
              <SoloRegistrationForm
                gameCode={eventData.gameCode}
                tId={eventData.id}
                setIsRegistered={setIsRegistered}
              />
            ),
          }[eventData.mode]
        ) : (
          <div
            className={
              'py-10 px-4 flex flex-col gap-4 font-sans text-green-400 ' +
              'font-semibold text-xl text-center sm:text-left'
            }
          >
            <span>You have registered for this event!</span>
            <span
              onClick={unregisterHandler}
              className={
                'text-gray-500 px-3 py-2 w-max text-lg rounded-md ' +
                'cursor-pointer hover:bg-red-400 hover:text-white active:bg-red-600'
              }
            >
              UNREGISTER
            </span>
          </div>
        )}
      </main>
      <SnackbarAlert
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        autoHideDuration={3000}
        type="success"
        message={{ label: 'Registered', message: 'Registration Successful' }}
      />
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
  eventId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId, eventId } = context.params as IParams;
  const eventData = await fetchEventDataById(eventId);
  return {
    props: {
      eventData,
      orgId,
    },
  };
};
