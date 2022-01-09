import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import { EventData } from '../../../utilities/eventItem/types';
import EventCard from '../../../components/Event/EventCard/EventCard';
import TextButton from '@/components/UI/Buttons/TextButton';
import router from 'next/router';
import axios from 'axios';

interface Props {
  events: EventData[];
  userData: UserData;
}

export default function Events({ events, userData }: Props) {
  // const allParticipatedEvents = events.map((eventItem: EventData) => (
  //   <EventCard key={eventItem._id} data={eventItem} isPageOwner={false} />
  // ));

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
          {/* {events.length > 0 ? allParticipatedEvents : emptyEventsComponent} */}
        </div>
      </Aux>
    </div>
  );
}

interface IParams extends ParsedUrlQuery {
  username: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let events: EventData[] = [];
  let userData: UserData = {} as UserData;
  const fetchParticipatedEvents = async (uid: string) => {
    const res = await axios.get(
      `${process.env.BASE_URL}/api/events/fetchParticipatedEvents`,
      {
        params: {
          uid,
        },
      }
    );
    return res.data.message;
  };
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.token)
      .then(async (user) => {
        const { username } = context.params as IParams;
        userData = await getUser(username);
        events = await fetchParticipatedEvents(userData.uid);
      });
    console.log(events);
  } catch (err) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    console.log('Error getting server side props:', err);
  }

  return {
    props: { userData, events },
  };
}
