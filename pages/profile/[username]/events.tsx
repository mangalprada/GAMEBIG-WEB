import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import EventCardForProfile from '../../../components/Event/EventCard/EventCardForProfile';
import TextButton from '@/components/UI/Buttons/TextButton';
import router, { useRouter } from 'next/router';
import axios from 'axios';

interface Props {
  userData: UserData;
}

export default function Events({ userData }: Props) {
  const router = useRouter();
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
    fetchEventById();
  }, [userData.uid]);

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

interface IParams extends ParsedUrlQuery {
  username: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userData: UserData = {} as UserData;
  try {
    const { username } = context.query;
    if (typeof username == 'string') {
      userData = await getUser(username);
    }

    return {
      props: { userData },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
