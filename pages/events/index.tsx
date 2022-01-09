import { useState } from 'react';
import Head from 'next/head';
import EventCard from '../../components/Event/EventCard/EventCard';
import { GetServerSideProps, NextPage } from 'next';
import { EventData } from '../../utilities/eventItem/types';
import MultiSelect from '@/components/UI/Select/MultiSelect';
import { GAMES, GameCodesOnly } from 'assets/data/Games';
import Modal from '@/components/UI/Modal/Modal';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import FilterIcon from '@/components/UI/Icons/EventIcons/FilterIcon';
import Feedback from '@/components/Feedback/Feedback';
import axios from 'axios';
const { BASE_URL } = process.env;

interface Props {
  events: EventData[];
}

const Home: NextPage<Props> = ({ events: eventsFromProps }: Props) => {
  const [events, setEvents] = useState(eventsFromProps);
  const [selectedGames, setSelectedGames] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = async () => {
    const games = selectedGames.length === 0 ? GameCodesOnly : selectedGames;
    let eventData = [] as EventData[];
    try {
    } catch (err) {
      console.log('Error fetching Event Ids', err);
    }
  };

  const allEvents = events.map((eventItem: EventData) => (
    <EventCard key={eventItem._id} data={eventItem} isPageOwner={false} />
  ));

  const emptyEventsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg mt-28 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="md:text-2xl text-xl text-gray-400 font-medium text-center">
        <p>Looks like there are no events yet.</p>
        <br />
        <p>Come after some time. Thank you for visiting.</p>
      </span>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content={
            'Upcoming Esports Events in COD, BGMI and FreeFire. ' +
            'Interested players can register instantly for custom rooms and events.'
          }
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Welcome to GameBig" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Join GameBig to connect and play with awsome gamers, just like you!"
        />
        <meta property="og-url" content="https://www.gamebig.in" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="md:w-2/3 xl:w-1/2 mx-2 md:mx-auto flex justify-evenly mt-4 mb-2 bg-indigo-900/60 rounded-md py-1 ">
          <span className="text-gray-300 font-semibold font-sans text-lg md:text-2xl mx-4">
            Upcoming Custom Room Matches
          </span>
        </div>
        <div className="md:w-2/3 xl:w-1/2 mx-auto flex justify-end">
          <section
            className={
              'bg-gray-900 hover:bg-gray-900/60 flex justify-evenly items-center ' +
              'cursor-pointer w-28 h-auto rounded-md py-1 mx-4 md:mx-0'
            }
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span className=" text-lg text-gray-300">Filter</span>
            <FilterIcon size={32} />
          </section>
        </div>
        {events.length === 0 ? emptyEventsComponent : allEvents}
        <Feedback />
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <div
            className={'w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-4'}
          >
            <MultiSelect
              label="Game"
              name="game"
              propToShow="id"
              values={selectedGames}
              handleChange={(item) => {
                if (selectedGames.includes(item.id)) {
                  setSelectedGames(
                    selectedGames.filter((i: string) => i !== item.id)
                  );
                } else {
                  setSelectedGames([...selectedGames, item.id]);
                }
              }}
              items={GAMES}
            />
          </div>
          <section className="flex justify-end w-3/4 md:w-2/3 mx-auto">
            <FixedButton name="Apply" onClick={handleFilter} />
          </section>
        </Modal>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`${BASE_URL}/api/events`);

  return {
    props: {
      events: response.data.message,
    },
  };
};
