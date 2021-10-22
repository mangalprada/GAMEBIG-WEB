import { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
interface Props {
  tId: string;
  gameCode: string;
}

export default function RegisterTournamentForm({ tId, gameCode }: Props) {
  const { user } = useAuth();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [backdropItem, setBackdropItem] = useState<number>(1);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTeams = () => {
      const teams: Array<TeamType> = [];
      if (user.username) {
        db.collection('teams')
          .where('gamers', 'array-contains-any', [user.username])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const { teamName, gamers, inGameLead } = doc.data();
              teams.push({ teamName, gamers, inGameLead, docId: doc.id });
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
      return teams;
    };

    const teams: TeamType[] = getTeams();
    setTeams(teams);
  }, [user.username]);

  useEffect(() => {
    if (tId && user.username) {
      db.collection('tournaments')
        .doc(tId)
        .collection('teams')
        .where('usernames', 'array-contains', user.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
              setTeamId(doc.id);
            }
          });
        });
    }
  }, [tId, user.username]);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const handleCreateTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setTeams([team, ...teams]);
    setBackdropItem(2);
  };

  const unregister = () => {
    db.collection('tournaments').doc(tId).collection('teams').doc(teamId)
      .delete;
  };

  if (isRegistered)
    return (
      <div className="">
        <h4>You have registered for this tournament.</h4>
        <div className="">
          <span onClick={unregister} className="">
            <h3>Unregister</h3>
          </span>
        </div>
      </div>
    );
  console.log(teams);

  return (
    <div id="register" className="font-sans font-semibold text-gray-300">
      <h3>Register For Tournament</h3>
      <SelectDropDown
        handleChange={(val) => setSelectedTeam(val)}
        label="Select From Existing Teams"
        menuItems={teams}
        propToShow="teamName"
      />
      <FixedButton
        isDisabled={!selectedTeam}
        onClickHandler={() => {
          setBackdropItem(2);
          openBackdrop();
        }}
        name={`Register ${selectedTeam?.teamName}`}
      />
      <span>OR</span>
      <span
        onClick={() => {
          setBackdropItem(1);
          openBackdrop();
        }}
        className=""
      >
        <h4>Create Your New Team</h4>
      </span>
      <Backdrop isOpen={open}>
        <div>
          {
            {
              1: (
                <CreateTeam
                  onCancel={closeBackdrop}
                  handleSubmit={handleCreateTeam}
                />
              ),
              2: (
                <GamerDetails
                  tId={tId}
                  onCancel={closeBackdrop}
                  team={selectedTeam}
                  gameCode={gameCode}
                  setIsRegistered={setIsRegistered}
                />
              ),
            }[backdropItem]
          }
        </div>
      </Backdrop>
    </div>
  );
}
