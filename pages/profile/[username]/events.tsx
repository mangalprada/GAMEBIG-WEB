import { useState, useEffect } from 'react';
import Head from 'next/head';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import EventCardForProfile from '../../../components/Event/EventCard/EventCardForProfile';
import TextButton from '@/components/UI/Buttons/TextButton';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

export default function Events() {
  const router = useRouter();
  const { data: userData } = useSWR(
    `${BASE_URL}/api/user/?username=${router.query.username}`,
    fetcher
  );
  const [paricipations, setParticipations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEventById() {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/participants/fetchParticipatedEvents`,
        {
          params: { uid: userData.uid },
        }
      );
      setParticipations(response.data.message);
    }
    if (userData) fetchEventById();
  }, [userData]);

  const allParticipatedEvents = paricipations.map((item: any) => (
    <EventCardForProfile
      key={item.eventItem}
      eventId={item.eventItem}
      slotNumber={item.slotNumber}
    />
  ));

  const emptyEventsComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 mt-4 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="text-lg text-gray-500 font-medium text-center">
        Not participated in any events ☹
      </span>
      <TextButton
        type="normal"
        name="Participate Now!"
        onClick={() => router.push('/')}
      />
    </div>
  );

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Players Profile" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ProfileHeader userData={userData} />
        <div className="mt-10">
          {paricipations.length > 0
            ? allParticipatedEvents
            : emptyEventsComponent}
        </div>
      </Aux>
    </div>
  );
}
