import HeaderOrg from '../../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../../../../components/UI/Card/TournamentCard';
import CreateTournament from '../../../../components/Tournament/CreateTournament/CreateTournament';

export default function Tournaments() {
  return (
    <Aux>
      <HeaderOrg tabNumber={0} />
      <CreateTournament />
      <TournamentCard isOrganizer={true} />
      <TournamentCard isOrganizer={true} />
    </Aux>
  );
}
