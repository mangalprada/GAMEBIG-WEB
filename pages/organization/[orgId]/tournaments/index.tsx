import HeaderOrg from '../../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../../../../components/UI/Card/TournamentCard';
import CreateTournamentButton from '../../../../components/Tournament/CreateTournament/CreateTournamentButton';
import { OrgFormData } from '../../../../utilities/organization/types';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { fetchOrganizationData } from '../../../../lib/fetchOrganizationData';
import { fetchTournamentsDataByOrgId } from '../../../../lib/getAllTournaments';
import { TournamentData } from '../../../../utilities/tournament/types';

interface Props {
  organizationData: OrgFormData | undefined;
  tournaments: TournamentData[];
}

export default function Tournaments({ organizationData, tournaments }: Props) {
  return (
    <Aux>
      {organizationData ? (
        <>
          <HeaderOrg data={organizationData} tabNumber={0} />
          {organizationData.id && (
            <CreateTournamentButton orgId={organizationData.id} />
          )}
          {tournaments.map((tournament: TournamentData) => (
            <TournamentCard
              key={tournament.id}
              data={tournament}
              isOrganizer={false}
            />
          ))}
        </>
      ) : (
        <div>Network Error</div>
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  orgId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orgId } = context.params as IParams;
  let organizationData = undefined;
  organizationData = await fetchOrganizationData(orgId);
  let tournaments = await fetchTournamentsDataByOrgId(orgId);
  tournaments = tournaments === undefined ? [] : tournaments;
  return {
    props: {
      organizationData,
      tournaments,
    },
  };
};
