import Head from 'next/head';
import Aux from '../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../components/Tournament/TournamentCard/TournamentCard';
import { GetServerSideProps } from 'next';
import { fetchAllTournamentData } from '../lib/getAllTournaments';
import { TournamentData } from '../utilities/tournament/types';

interface Props {
  tournaments: TournamentData[];
}

export default function Home({ tournaments }: Props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Upcoming Esports Events in COD, BGMI and FreeFire. Interested players can register instantly for custom rooms and tournaments."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const tournaments = await fetchAllTournamentData();
  return {
    props: {
      tournaments,
    },
  };
};
