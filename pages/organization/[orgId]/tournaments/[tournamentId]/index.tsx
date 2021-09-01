import DetailsAsOrganizer from '../../../../../components/Tournament/Details/DetailsAsOrganizer';
import DetailsAsParticipant from '../../../../../components/Tournament/Details/DetailsAsParticipant';
import ParticipantList from '../../../../../components/Tournament/ParticipantList/ParticipantList';
import RegisterTournamentForm from '../../../../../components/Tournament/Register/RegisterTournamentForm';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary';

export default function Tournament() {
  let isOrganizer = false;
  return (
    <Aux>
      {isOrganizer ? (
        <>
          <DetailsAsOrganizer />
          <ParticipantList />
        </>
      ) : (
        <>
          <DetailsAsParticipant />
          <RegisterTournamentForm />
        </>
      )}
    </Aux>
  );
}
