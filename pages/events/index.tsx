import { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import EventCard from '../../components/Event/EventCard/EventCard';
import { NextPage } from 'next';
import { EventData } from '../../utilities/eventItem/types';
import MultiSelect from '@/components/UI/Select/MultiSelect';
import { GAMES, GameCodesOnly } from 'assets/data/Games';
import Modal from '@/components/UI/Modal/Modal';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import FilterIcon from '@/components/UI/Icons/EventIcons/FilterIcon';
import Feedback from '@/components/Feedback/Feedback';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import EsportsIcon from '@/components/UI/Icons/EventIcons/EsportsIcon';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
const { BASE_URL } = process.env;

async function getEvents(arg: string) {
  const response = await axios.get(arg);
  return response.data.message;
}

const Home: NextPage = () => {
  const {
    userData: { linkedPageIds },
  } = useAuth();
  const { data: events } = useSWR(`${BASE_URL}/api/events`, getEvents);

  const pageId = linkedPageIds ? linkedPageIds[0] : null;
  const [selectedGames, setSelectedGames] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  function goToPage() {
    const path = pageId ? `/page/${pageId}/events` : `/page`;
    router.push(path);
  }

  const handleFilter = async () => {
    const games = selectedGames.length === 0 ? GameCodesOnly : selectedGames;
    let eventData = [] as EventData[];
    try {
    } catch (err) {
      console.log('Error fetching Event Ids', err);
    }
  };

  const allEvents = events
    ? events.map((eventItem: EventData) => (
        <EventCard key={eventItem._id} data={eventItem} isPageOwner={false} />
      ))
    : null;

  const emptyEventsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg mt-28 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="md:text-2xl text-xl text-gray-300 font-medium text-center">
        <p>More Events Comming Soon 🥳🎉 </p>
        <br />
        <p>Please check after sometime. Thank you for visiting 😊🙏</p>
      </span>
    </div>
  );

  if (!events) return <LurkingCat height={300} width={300} />;

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
        <div
          className="md:w-2/3 xl:w-1/2 mx-2 md:mx-auto flex justify-evenly rounded-b-md
         bg-gradient-to-b from-black via-cyan-900 to-cyan-900 py-1 mb-2 "
        >
          <span className="text-gray-300 font-semibold font-sans text-sm sm:text-lg md:text-xl mx-4">
            Upcoming Custom Room Matches
          </span>
        </div>
        {/* <div className="md:w-2/3 xl:w-1/2 mx-auto flex justify-end">
          <section
            className={
              'bg-slate-900 hover:bg-slate-900/60 flex justify-evenly items-center ' +
              'cursor-pointer w-28 h-auto rounded-md py-1 mx-4 md:mx-0'
            }
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span className=" text-lg text-gray-300">Filter</span>
            <FilterIcon size={32} />
          </section>
        </div> */}
        {events && events.length === 0 ? emptyEventsComponent : allEvents}
        <div className={'w-11/12 md:w-2/3 xl:w-1/2 mx-auto'}>
          <ResponsiveButton
            name="Organize Your Own Matches 🏆"
            onClick={goToPage}
          />
        </div>
        {/* <Feedback /> */}
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
