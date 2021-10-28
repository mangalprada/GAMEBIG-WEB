import { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
import Backdrop from '../../UI/Backdrop/Backdrop';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
import SnackbarAlert from '../../UI/Snackbar/SnackBar';
interface Props {
  tId: string;
  gameCode: string;
  teamSize: number;
  setIsRegistered: (val: boolean) => void;
}

export default function RegisterEventForm({
  tId,
  gameCode,
  teamSize,
  setIsRegistered,
}: Props) {
  const { user } = useAuth();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [backdropItem, setBackdropItem] = useState<number>(1);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [enableRegister, setEnableRegister] = useState<boolean>(false);
  const [showSnakbar, setShowSnakbar] = useState<boolean>(false);
  const [snakbarMessage, setSnakbarMessage] = useState<string>('');
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
            setSelectedTeam(val);
            if (val.gamers.lenth === teamSize) setEnableRegister(true);
            else
              setSnakbarMessage(
                `We need ${teamSize} players, ${val.teamName} has ${val.gamers.length}`
              );
          }}
          label="Select From Existing Teams"
          menuItems={teams}
          propToShow="teamName"
        />
        <FixedButton
          isDisabled={enableRegister}
          onClickHandler={() => {
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
                  teamSize={teamSize}
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
      <SnackbarAlert
        autoHideDuration={5000}
        message={{
          label: 'Oops!',
          message: snakbarMessage,
        }}
        onClose={hideSnackbar}
        open={showSnakbar}
        type="info"
      />
    </div>
  );
}
