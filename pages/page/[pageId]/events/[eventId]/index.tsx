import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventDetails from '@/components/Event/Details/EventDetails';
import { useAuth } from '@/context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { EventData } from '../../../../../utilities/eventItem/types';
import Modal from '@/components/UI/Modal/Modal';
import CreateEvent from '@/components/Event/CreateEvent/CreateEventForm';
import Tabs from '@/components/Event/Details/Tabs';
import ParticipantList from '@/components/Event/ParticipantList/ParticipantList';
import EventUserView from '@/components/Event/Register/EventUserView';
import EventResults from '@/components/Event/Result/EventResults';
import EventOrganizerView from '@/components/Event/Register/EventOrganizerView';
import axios from 'axios';

export default function Event() {
  const {
    userData: { uid, linkedPageIds },
  } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<EventData>();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [tabKey, setTabKey] = useState(1);
  const [teamId, setTeamId] = useState<string>('');
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const isPageOwner = () => {
    if (linkedPageIds && typeof router.query.pageId === 'string') {
      return linkedPageIds.includes(router.query.pageId);
    } else {
      return false;
    }
  };

  useEffect(() => {
    const checkRegistration = async () => {
      if (event && uid) {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/participants`,
          {
            params: {
              eventId: event._id,
              uid,
            },
          }
        );
        setIsRegistered(response.data.message);
      }
    };
    checkRegistration();
  }, [event, uid]);

  useEffect(() => {
    const { eventId } = router.query;
    async function fetchEventById() {
      const response = await axios.get(`${process.env.BASE_URL}/api/events`, {
        params: { id: eventId },
      });
      setEvent(response.data.message);
    }
    fetchEventById();
  }, [router.query]);

  const changeTab = (tab: number) => {
    setTabKey(tab);
  };

  if (!event) return null;

  return (
    <Aux>
      <Head>
        <title>Event</title>
        <meta
          name="description"
          content="Details and Registration"
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Event" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Check this event on GameBig and register now!"
        />

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
        <EventDetails
          isUserRegistered={isRegistered}
          isPageOwner={isPageOwner()}
          data={event}
          openEditModal={openModal}
        />

        {/* <EventResults eventId={event._id} /> */}
        {isPageOwner() ? (
          <Tabs
            tabs={[
              { key: 1, label: 'Register' },
              { key: 2, label: 'Organize' },
              { key: 3, label: 'Participants' },
            ]}
            currentTab={tabKey}
            changeTab={changeTab}
          />
        ) : null}
        <div>
          {
            {
              1: (
                <EventUserView
                  eventData={event}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  setTeamId={setTeamId}
                />
              ),
              2: <EventOrganizerView eventData={event} />,
              3: <ParticipantList eventData={event} />,
            }[tabKey]
          }
        </div>
        <Modal isOpen={open} closeModal={closeModal}>
          <CreateEvent
            gameCode={event.gameCode}
            onCancel={closeModal}
            oldValues={event}
          />
        </Modal>
      </main>
    </Aux>
  );
}
