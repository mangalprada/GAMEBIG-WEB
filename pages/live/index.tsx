import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Image from 'next/image';
import EventCard from '../../components/Event/EventCard/EventCard';
import { NextPage } from 'next';
import { EventData } from '../../utilities/eventItem/types';
import MultiSelect from '@/components/UI/Select/MultiSelect';
import { GAMES, GameCodesOnly } from 'assets/data/Games';
import Modal from '@/components/UI/Modal/Modal';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import EventTabs from '@/components/Event/others/EventTabs';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import EventCardAvatar from '@/components/UI/Avatar/EventCardAvatar';
import ShareEventLink from '@/components/UI/Share/ShareEventLink';
import { games } from '@/utilities/GameList';
import TextButton from '@/components/UI/Buttons/TextButton';

const { BASE_URL } = process.env;

async function getEvents(arg: string) {
  const response = await axios.get(arg);
  return response.data.message;
}

function getVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const Home: NextPage = () => {
  const {
    userData: { linkedPageIds, uid },
  } = useAuth();
  const { data: events } = useSWR(
    `${BASE_URL}/api/events/liveEvents`,
    getEvents
  );

  const pageId = linkedPageIds ? linkedPageIds[0] : null;
  const [selectedGames, setSelectedGames] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const checkRegistration = async (eventId: string) => {
    if (eventId && uid) {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/participants`,
        {
          params: {
            eventId: eventId,
            uid,
          },
        }
      );
      if (response.data.message.length > 0) {
        return response.data.message[0].slotNumber;
      }
      return null;
    }
  };

  function goToPage() {
    const path = pageId ? `/page/${pageId}` : `/page`;
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
  function openLinkedpage(pageId: string) {
    router.push(`/page/${pageId}/`);
  }
  const EventItem = ({ event }: { event: EventData }) => {
    if (event.streamLink) {
      return (
        <div className="my-1 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto bg-slate-900 rounded-md border-4 md:border-8 border-slate-900">
          <div className="flex flex-nowrap justify-between px-8 content-center py-5">
            <div className="flex flex-row">
              <EventCardAvatar
                content={event.pageName[0]}
                onclick={() => openLinkedpage(event.pageId)}
              />
              <div>
                <span
                  className="text-gray-300  text-xs sm:text-lg font-semibold font-sans tracking-wide mx-3 hover:underline cursor-pointer"
                  onClick={() => openLinkedpage(event.pageId)}
                >
                  {event.pageName}
                </span>
                <section className="flex flex-row mx-2 items-center mt-0.5">
                  <LocationIcon
                    className={'fill-current text-indigo-500'}
                    size={15}
                  />
                  <span className="text-gray-300 text-xs sm:text-sm font-semibold font-sans ml-1">
                    India
                  </span>
                </section>
              </div>
            </div>

            {/** Share Event */}
            <ShareEventLink
              link={`https://gamebig.in/page/${event.pageId}/events/${event._id}`}
              game={games[event.gameCode].shortName}
            />
          </div>
          <iframe
            src={
              'https://www.youtube.com/embed/' + getVideoId(event.streamLink)
            }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="mx-auto h-96 w-full"
          />
          <div className="flex items-center justify-between px-4">
            <section className="flex flex-row gap-x-2 py-2 sm:gap-x-3 items-center ml-[1.25rem] md:ml-[2.15rem]">
              {event.gameCode ? (
                <span className="h-8 w-8 relative">
                  <Image
                    src={games[event.gameCode].imageSource}
                    alt=""
                    objectFit="contain"
                    layout="fill"
                    className="rounded-md"
                  />
                </span>
              ) : null}
              <span
                className={
                  'text-gray-300 text-sm sm:text-lg h-10 font-semibold ' +
                  'flex flex-col justify-center '
                }
              >
                {`${games[event.gameCode].shortName} - ${event.type}`}
              </span>
            </section>
            <TextButton
              name="DETAILS"
              type="normal"
              onClick={() =>
                router.push(`/page/${event.pageId}/events/${event._id}/`)
              }
            />
          </div>
        </div>
      );
    }
    return <EventCard key={event._id} data={event} isPageOwner={false} />;
  };

  const allEvents = events
    ? events.map((eventItem: EventData) => (
        <EventItem key={eventItem._id} event={eventItem} />
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
        <p>Events will be live Soon 🥳🎉 </p>
        <br />
        <p>Please check Upcoming Events 😊🙏</p>
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
        <EventTabs />
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
