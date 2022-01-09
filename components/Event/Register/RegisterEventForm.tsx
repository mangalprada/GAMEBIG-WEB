import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Team/createTeam';
import GamerDetails from './GamerDetails';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
import Modal from '@/components/UI/Modal/Modal';
import { useUI } from '@/context/uiContext';
import { EventData } from '@/utilities/eventItem/types';

interface Props {
  teamSize: number;
  eventData: EventData;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
}

export default function RegisterEventForm({
  eventData,
  teamSize,
  setIsRegistered,
  setTeamId,
}: Props) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();

  const [teams, setTeams] = useState<TeamType[]>([]);
  const [modalItem, setModalItem] = useState<number>(1);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [disableRegister, setDisableRegister] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTeams = () => {
      const teams: Array<TeamType> = [];
      if (userData.uid) {
        db.collection('teams')
          .where('uids', 'array-contains-any', [userData.uid])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const team = doc.data() as TeamType;
              teams.push({ ...team, docId: doc.id });
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
  }, [userData.uid]);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4"
    >
      <label className="font-sans font-semibold text-2xl text-gray-300 py-5">
        Register Now To Partcipate
      </label>
      <div className="mt-4 md:w-1/2 ">
        <SelectDropDown
          handleChange={(val) => {
            if (val.gamers.length === teamSize) {
              setDisableRegister(false);
              setSelectedTeam(val);
            } else {
              setDisableRegister(true);
              openSnackBar({
                label: 'Oops!',
                message: `We need ${teamSize} players, ${val.teamName} has ${val.gamers.length}.`,
                type: 'warning',
              });
            }
          }}
          label="Select From Existing Teams"
          menuItems={teams}
          propToShow="teamName"
        />
        <FixedButton
          isDisabled={disableRegister}
          onClick={() => {
            setModalItem(2);
            openModal();
          }}
          name="Register"
        />
      </div>
      <div className="px-4">
        <span className="text-xl">OR</span>
      </div>
      <FixedButton
        onClick={() => {
          setModalItem(1);
          openModal();
        }}
        name="Create Your New Team"
      />
      <Modal isOpen={open} closeModal={closeModal}>
        <div>
          {
            {
              1: <CreateTeam teamSize={teamSize} onCancel={closeModal} />,
              2: (
                <GamerDetails
                  setTeamId={setTeamId}
                  teamSize={teamSize}
                  eventId={eventData._id}
                  eventData={eventData}
                  onCancel={closeModal}
                  team={selectedTeam}
                  gameCode={eventData.gameCode}
                  setIsRegistered={setIsRegistered}
                />
              ),
            }[modalItem]
          }
        </div>
      </Modal>
    </div>
  );
}
