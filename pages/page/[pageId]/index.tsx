import { useState } from 'react';
import Head from 'next/head';
import PageHeader from '../../../components/Page/PageHeader/PageHeader';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import EventCard from '../../../components/Event/EventCard/EventCard';
import OrgButtons from '../../../components/Event/CreateEvent/OrgButtons';
import { EventData } from '../../../utilities/eventItem/types';
import CreateEventForm from '../../../components/Event/CreateEvent/CreateEventForm';
import Modal from '@/components/UI/Modal/Modal';
import SelectGame from '@/components/Game/SelectGame';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
const { BASE_URL } = process.env;

async function getData(arg: string) {
  const response = await axios.get(arg);
  return response.data.data;
}

export default function Events() {
  const { userData } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [gameCode, setGameCode] = useState('');

  const { pageId } = router.query;

  const { data: pageData } = useSWR(
    `${BASE_URL}/api/page/?pageId=${pageId}`,
    getData
  );

  const { data: events } = useSWR(
    `${BASE_URL}/api/events/?pageId=${pageId}`,
    getData
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setPageNumber(1);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const hostedEvents = events ? (
    events.map((eventItem: EventData) => (
      <EventCard key={eventItem._id} data={eventItem} isPageOwner={false} />
    ))
  ) : (
    <LurkingCat height={300} width={300} />
  );

  const emptyEventsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 mt-10 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="text-xl text-gray-400 font-medium text-center">
        No Events Yet!! Check back later or Contact the organizer.
      </span>
    </div>
  );

  if (!pageData) return <LurkingCat height={180} width={180} />;

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
      <div>
        <PageHeader data={pageData} />
        {pageData.category === 'organizer' && typeof pageId === 'string' ? (
          <OrgButtons
            onClick={openModal}
            pageId={pageId}
            isPageOwner={pageData.admins.includes(userData.uid)}
          />
        ) : null}
        {events && events.length === 0 ? emptyEventsComponent : hostedEvents}
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div>
          {pageData ? (
            <div>
              {
                {
                  1: (
                    <SelectGame
                      updatePage={(pageNumber) => setPageNumber(pageNumber)}
                      setGame={setGameCode}
                      gameCode={gameCode}
                    />
                  ),
                  2: (
                    <CreateEventForm
                      onCancel={closeModal}
                      gameCode={gameCode}
                      pageId={pageData?.id}
                      pageName={pageData.name}
                      pageDisplayPicture={pageData.displayPicture}
                    />
                  ),
                }[pageNumber]
              }
            </div>
          ) : null}
        </div>
      </Modal>
    </Aux>
  );
}
