import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import TournamentDetails from '../../../../../components/Tournament/Details/TournamentDetails';
import ParticipantList from '../../../../../components/Tournament/ParticipantList/ParticipantList';
import RegisterTournamentForm from '../../../../../components/Tournament/Register/RegisterTournamentForm';
import { useAuth } from '../../../../../context/authContext';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';
import { fetchTournamentDataById } from '../../../../../lib/getTournamentData';
import { TournamentData } from '../../../../../utilities/tournament/types';

interface Props {
  orgId: string;
  tournamentData: TournamentData;
}

export default function Tournament({ orgId, tournamentData }: Props) {
  const {
    userData: { linkedOrganizationId },
  } = useAuth();

  let isOrganizer = linkedOrganizationId === orgId ? true : false;

  return (
    <Aux>
      <Head>
        <title>Tournament</title>
        <meta name="description" content="Details and Registeration" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <TournamentDetails data={tournamentData} />
      {isOrganizer ? (
        <ParticipantList />
      ) : (
        <RegisterTournamentForm
          gameCode={tournamentData.gameCode}
          tId={tournamentData.id}
        />
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
  tournamentId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId, tournamentId } = context.params as IParams;
  const tournamentData = await fetchTournamentDataById(tournamentId);
  return {
    props: {
      tournamentData,
      orgId,
    },
  };
};
