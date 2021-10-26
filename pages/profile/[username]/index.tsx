import Head from 'next/head';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../lib/getUser';
import { EventData } from '../../../utilities/event/types';
import { fetchEventsDataByUsername } from '../../../lib/getAllEvents';
import EventCard from '../../../components/Event/EventCard/EentCard';

interface Props {
  events: EventData[];
  userData: UserData;
}

export default function Home({ events, userData }: Props) {
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
          {events.map((eventItem: EventData) => (
            <EventCard
              key={eventItem.id}
              data={eventItem}
              isOrganizer={false}
            />
          ))}
        </div>
      </Aux>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let events: EventData[] = [];
  let userData: UserData = {} as UserData;
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.token)
      .then(async () => {
        const { username } = context.query;
        if (typeof username == 'string') {
          userData = await getUser(username);
          events = await fetchEventsDataByUsername(username);
        }
      });
    return {
      props: { userData, events },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
