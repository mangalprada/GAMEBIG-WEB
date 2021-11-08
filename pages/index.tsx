import { useState } from 'react';
import Head from 'next/head';
import EventCard from '../components/Event/EventCard/EventCard';
import { GetServerSideProps } from 'next';
import { fetchAllEventData } from '../libs/getAllEvents';
import { EventData } from '../utilities/eventItem/types';
import MultiSelect from '@/components/UI/Select/MultiSelect';
import { MODES, ModesOnly, SCREAMS, ScreamsOnly } from '../assets/data/Utils';
import { GAMES, GameCodesOnly } from 'assets/data/Games';
import Modal from '@/components/UI/Modal/Modal';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import FilterIcon from '@/components/UI/Icons/EventIcons/FilterIcon';
import { db } from 'firebase/firebaseClient';
import Feedback from '@/components/Feedback/Feedback';

interface Props {
  events: EventData[];
}

export default function Home({ events: eventsFromProps }: Props) {
  const [events, setEvents] = useState(eventsFromProps);
  const [selectedGames, setSelectedGames] = useState<any>([]);
  const [selectedModes, setSelectedModes] = useState<any>([]);
  const [selectedTiers, setSelectedTiers] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = async () => {
    const games = selectedGames.length === 0 ? GameCodesOnly : selectedGames;
    const modes = selectedModes.length === 0 ? ModesOnly : selectedModes;
    const tiers = selectedTiers.length === 0 ? ScreamsOnly : selectedTiers;
    const query = db.collection('events').where('gameCode', 'in', games);
    // .where('mode', 'in', modes)
    // .where('tier', 'in', tiers);
    let eventData = [] as EventData[];
    try {
      const querySnapshot = await query.get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const event = {
          id: doc.id,
          gameCode: data.gameCode,
          mode: data.mode,
          type: data.type,
          tier: data.tier,
          noOfSlots: data.noOfSlots,
          description: data.description,
          prize: data.prize,
          startTime: data.startTime.toDate().toISOString(),
          createdAt: data.createdAt.toDate().toISOString(),
          linkedOrgId: data.linkedOrgId,
          linkedOrgName: data.linkedOrgName,
        };
        eventData.push(event);
      });
      setEvents(eventData);
      console.log(eventData);
      setIsModalOpen(false);
    } catch (err) {
      console.log('Error fetching Event Ids', err);
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Upcoming Esports Events in COD, BGMI and FreeFire. Interested players can register instantly for custom rooms and events."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="md:w-2/3 xl:w-1/2 mx-auto flex justify-end mt-4 mb-5">
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
        {events.map((eventItem: EventData) => (
          <EventCard key={eventItem.id} data={eventItem} isOrganizer={false} />
        ))}
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
            {/* <MultiSelect
                label="Mode"
                name="mode"
                propToShow="name"
                values={selectedModes}
                handleChange={(item) => {
                  if (selectedModes.includes(item.name)) {
                    setSelectedModes(
                      selectedModes.filter((i: string) => i !== item.name)
                    );
                  } else {
                    setSelectedModes([...selectedModes, item.name]);
                  }
                }}
                items={MODES}
              />
              <MultiSelect
                label="Tier"
                name="tier"
                values={selectedTiers}
                propToShow="name"
                handleChange={(item) => {
                  if (selectedTiers.includes(item.name)) {
                    setSelectedTiers(
                      selectedTiers.filter((i: string) => i !== item.name)
                    );
                  } else {
                    setSelectedTiers([...selectedTiers, item.name]);
                  }
                }}
                items={SCREAMS}
              /> */}
          </div>
          <section className="flex justify-end w-3/4 md:w-2/3 mx-auto">
            <FixedButton name="Apply" onClick={handleFilter} />
          </section>
        </Modal>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await fetchAllEventData();
  return {
    props: {
      events,
    },
  };
};
