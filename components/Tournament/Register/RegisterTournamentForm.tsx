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
      <div className="py-10 flex flex-col gap-4 font-sans text-indigo-600 font-semibold text-xl">
        <span>You have registered for this tournament.</span>
        <span
          onClick={unregister}
          className="text-gray-500 hover:bg-gray-800 rounded-md p-3 w-32"
        >
          Unregister
        </span>
      </div>
    );

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4"
    >
      <label className="text-xl text-gray-300 py-5">
        Register For Tournament
      </label>
      <div className="mt-4 md:w-1/2 ">
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
      </div>
      <div className="px-4">
        <span className="text-xl">OR</span>
      </div>

      <FixedButton
        onClickHandler={() => {
          setBackdropItem(1);
          openBackdrop();
        }}
        name="Create Your New Team"
      />
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
