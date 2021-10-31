import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
import SnackbarAlert from '@/components/UI/Snackbar/SnackBar';
interface Props {
  eventId: string;
  gameCode: string;
  setIsAlertOpen: () => void;
  teamSize: number;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
}

export default function RegisterEventForm({
  eventId,
  gameCode,
  teamSize,
  setIsRegistered,
  setIsAlertOpen,
  setTeamId,
}: Props) {
  const { userData } = useAuth();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [backdropItem, setBackdropItem] = useState<number>(1);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [disableRegister, setDisableRegister] = useState<boolean>(true);
  const [showSnakbar, setShowSnakbar] = useState<boolean>(false);
  const [snakbarMessage, setSnakbarMessage] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTeams = () => {
      const teams: Array<TeamType> = [];
      if (userData.username) {
        db.collection('teams')
          .where('gamers', 'array-contains-any', [userData.username])
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
  }, [userData.username]);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const hideSnackbar = () => {
    setShowSnakbar(false);
  };

  const handleCreateTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setTeams([team, ...teams]);
    setBackdropItem(2);
  };

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4"
    >
      <label className="text-xl text-gray-300 py-5">Register For Event</label>
      <div className="mt-4 md:w-1/2 ">
        <SelectDropDown
          handleChange={(val) => {
            if (val.gamers.length === teamSize) {
              setDisableRegister(false);
              setSelectedTeam(val);
            } else {
              setDisableRegister(true);
              setSnakbarMessage(
                `We need ${teamSize} players, ${val.teamName} has ${val.gamers.length}.`
              );
              setShowSnakbar(true);
            }
          }}
          label="Select From Existing Teams"
          menuItems={teams}
          propToShow="teamName"
        />
        <FixedButton
          isDisabled={disableRegister}
          onClick={() => {
            setBackdropItem(2);
            openBackdrop();
          }}
          name="Register"
        />
      </div>
      <div className="px-4">
        <span className="text-xl">OR</span>
      </div>
      <FixedButton
        onClick={() => {
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
                  teamSize={teamSize}
                />
              ),
              2: (
                <GamerDetails
                  setIsAlertOpen={setIsAlertOpen}
                  setTeamId={setTeamId}
                  teamSize={teamSize}
                  eventId={eventId}
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
      <SnackbarAlert
        autoHideDuration={5000}
        message={{
          label: 'Oops!',
          message: snakbarMessage,
        }}
        onClose={hideSnackbar}
        open={showSnakbar}
        type="warning"
      />
    </div>
  );
}
