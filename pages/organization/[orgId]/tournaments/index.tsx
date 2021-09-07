import HeaderOrg from '../../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../../../../components/UI/Card/TournamentCard';
import CreateTournamentButton from '../../../../components/Tournament/CreateTournament/CreateTournamentButton';
import { OrgFormData } from '../../../../utilities/organization/types';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';
import { fetchOrganizationData } from '../../../../lib/fetchOrganizationData';

interface Props {
  organizationData: OrgFormData | undefined;
}

export default function Tournaments({ organizationData }: Props) {
  return (
    <Aux>
      {organizationData ? (
        <>
          <HeaderOrg data={organizationData} tabNumber={0} />
          <CreateTournamentButton />
          <TournamentCard isOrganizer={true} />
          <TournamentCard isOrganizer={true} />
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
  return {
    props: {
      organizationData,
    },
  };
};
