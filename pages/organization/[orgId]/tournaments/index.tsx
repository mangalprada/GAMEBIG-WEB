import HeaderOrg from '../../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../../../../components/UI/Card/TournamentCard';
import CreateTournamentButton from '../../../../components/Tournament/CreateTournament/CreateTournamentButton';

export default function Tournaments() {
  return (
    <Aux>
      <HeaderOrg tabNumber={0} />
      <CreateTournamentButton />
      <TournamentCard isOrganizer={true} />
      <TournamentCard isOrganizer={true} />
    </Aux>
  );
}
