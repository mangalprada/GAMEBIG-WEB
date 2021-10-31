import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
import router from 'next/router';

interface Props {
  tId: string;
  gameCode: string;
  setIsAlertOpen: () => void;
}

export default function RegisterEventForm({
  tId,
  gameCode,
  setIsAlertOpen,
}: Props) {
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
      db.collection('events')
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

  const unregisterHandler = () => {
    db.collection('events').doc(tId).collection('teams').doc(teamId).delete();
    router.push('/');
  };

  if (isRegistered)
    return (
      <div
        className={
          'py-10 px-4 flex flex-col gap-4 font-sans text-green-400 ' +
          'font-semibold text-xl text-center sm:text-left'
        }
      >
        <span>You have already registered for this event!</span>
        <span
          onClick={unregisterHandler}
          className={
            'text-gray-500 px-3 py-2 w-max text-lg rounded-md ' +
            'cursor-pointer hover:bg-red-400 hover:text-white active:bg-red-600'
          }
        >
          UNREGISTER
        </span>
      </div>
    );

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4"
    >
      <label className="text-xl text-gray-300 py-5">Register For Event</label>
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
                  setIsAlertOpen={setIsAlertOpen}
                  tId={tId}
                  setTeamId={setTeamId}
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
