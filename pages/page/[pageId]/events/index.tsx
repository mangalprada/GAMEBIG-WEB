import { useState, useEffect } from 'react';
import Head from 'next/head';
import PageHeader from '../../../../components/Page/PageHeader/PageHeader';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import EventCard from '../../../../components/Event/EventCard/EventCard';
import CreateEventButton from '../../../../components/Event/CreateEvent/CreateEventButton';
import { PageFormData } from '../../../../utilities/page/types';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { fetchPageData } from '../../../../libs/fetchPageData';
import { EventData } from '../../../../utilities/eventItem/types';
import CreateEventForm from '../../../../components/Event/CreateEvent/CreateEventForm';
import Modal from '@/components/UI/Modal/Modal';
import SelectGame from '@/components/Game/SelectGame';
import { useAuth } from '@/context/authContext';
import axios from 'axios';

interface Props {
  pageData: PageFormData;
}

export default function Events({ pageData }: Props) {
  const { userData } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [gameCode, setGameCode] = useState('');

  useEffect(() => {
    async function fetchEventsBypageId() {
      const response = await axios.get(`${process.env.BASE_URL}/api/events`, {
        params: { pageId: pageData.id },
      });
      setEvents(response.data.message);
    }

    fetchEventsBypageId();
  }, [pageData.id]);

  const closeModal = () => {
    setIsModalOpen(false);
    setPageNumber(1);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const hostedEvents = events.map((eventItem: EventData) => (
    <EventCard key={eventItem._id} data={eventItem} isPageOwner={false} />
  ));

  const emptyEventsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 mt-10 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="text-xl text-gray-400 font-medium text-center">
        Start hosting new Events and build your community!
      </span>
    </div>
  );

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
      {pageData ? (
        <>
          <PageHeader data={pageData} />
          {pageData.admins.includes(userData.uid) &&
          pageData.category === 'organizer' ? (
            <CreateEventButton onClick={openModal} />
          ) : null}
          {events.length === 0 ? emptyEventsComponent : hostedEvents}
        </>
      ) : (
        <div>Network Error</div>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
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
                />
              ),
            }[pageNumber]
          }
        </div>
      </Modal>
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  pageId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.params as IParams;
  let pageData = undefined;
  pageData = await fetchPageData(pageId);
  return {
    props: {
      pageData,
    },
  };
};
