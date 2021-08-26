import HeaderOrg from '../../../components/Organization/HeaderOrg/HeaderOrg';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import TournamentCard from '../../../components/UI/Card/TournamentCard';

export default function Tournaments() {
  return (
    <Aux>
      <HeaderOrg tabNumber={0} />
      <TournamentCard />
      <TournamentCard />
    </Aux>
  );
}
