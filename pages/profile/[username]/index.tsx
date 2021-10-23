import Head from 'next/head';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../lib/getUser';
import { TournamentData } from '../../../utilities/tournament/types';
import { fetchTournamentsDataByUsername } from '../../../lib/getAllTournaments';
import TournamentCard from '../../../components/Tournament/TournamentCard/TournamentCard';

interface Props {
  tournaments: TournamentData[];
  userData: UserData;
}

export default function Home({ tournaments, userData }: Props) {
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
          {tournaments.map((tournament: TournamentData) => (
            <TournamentCard
              key={tournament.id}
              data={tournament}
              isOrganizer={false}
            />
          ))}
        </div>
      </Aux>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let tournaments: TournamentData[] = [];
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
          tournaments = await fetchTournamentsDataByUsername(username);
        }
      });
    return {
      props: { userData, tournaments },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
