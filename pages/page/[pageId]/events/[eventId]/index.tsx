import { useState, useEffect } from 'react';
import Head from 'next/head';
import EventDetails from '@/components/Event/Details/EventDetails';
import { useAuth } from '@/context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import Modal from '@/components/UI/Modal/Modal';
import CreateEvent from '@/components/Event/CreateEvent/CreateEventForm';
import Tabs from '@/components/Event/Details/Tabs';
import ParticipantList from '@/components/Event/ParticipantList/ParticipantList';
import EventUserView from '@/components/Event/Register/EventUserView';
import EventOrganizerView from '@/components/Event/Register/EventOrganizerView';
import axios from 'axios';
import Help from '@/components/Event/Details/Help';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const { BASE_URL } = process.env;

async function fetcher(arg: string) {
  const response = await axios.get(arg);
  return response.data.data;
}

export default function Event() {
  const router = useRouter();
  const { pageId, eventId } = router.query;
  const {
    userData: { uid, linkedPageIds },
  } = useAuth();

  const { data: event } = useSWR(
    `${BASE_URL}/api/events/?id=${eventId}`,
    fetcher
  );

  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [bookingDetails, setBookingdetails] = useState<any>(null);
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
    if (linkedPageIds && pageId) {
      return linkedPageIds.includes(pageId as string);
    } else {
      return false;
    }
  };

  useEffect(() => {
    const checkBooking = async () => {
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
        if (response.data.message.length > 0) {
          setIsRegistered(true);
          setBookingdetails(response.data.message[0]);
        }
      }
    };
    checkBooking();
  }, [event, uid]);

  const changeTab = (tab: number) => {
    setTabKey(tab);
  };

  if (!event) return <LurkingCat height={400} width={400} />;

  const TabsForOrganizer = [
    { key: 1, label: 'Register' },
    { key: 2, label: 'Organize' },
    { key: 3, label: 'Participants' },
  ];

  const TabsForOthers = [
    { key: 1, label: 'Register' },
    { key: 4, label: 'Need Help' },
  ];

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
        <Tabs
          tabs={isPageOwner() ? TabsForOrganizer : TabsForOthers}
          currentTab={tabKey}
          changeTab={changeTab}
        />

        <div>
          {
            {
              1: (
                <EventUserView
                  eventData={event}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                  setTeamId={setTeamId}
                  bookingDetails={bookingDetails}
                  setBookingdetails={setBookingdetails}
                />
              ),
              2: <EventOrganizerView eventData={event} />,
              3: <ParticipantList eventData={event} />,
              4: <Help pageId={event.pageId} />,
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
