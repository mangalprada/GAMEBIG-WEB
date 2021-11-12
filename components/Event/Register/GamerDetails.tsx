import { useState, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerRegistrationForm from './GamerRegistrationForm';

interface Props {
  setTeamId: Dispatch<SetStateAction<string>>;
  eventId: string;
  teamSize: number;
  team?: TeamType;
  gameCode: string;
  onCancel: () => void;
  setIsRegistered: (val: boolean) => void;
}

export default function GamerDetails({
  setTeamId,
  eventId,
  teamSize,
  team,
  gameCode,
  onCancel,
  setIsRegistered,
}: Props) {
  const [gamers, setGamers] = useState({} as Record<string, GamerData>);

  const updateGamer = (uid: string, gamer: GamerData) => {
    gamers[uid] = gamer;
  };

  const handleRegister = () => {
    const gamersArray: GamerData[] = [];
    const uids: string[] = [];
    Object.keys(gamers).map(function (key) {
      gamersArray.push({ ...gamers[key] });
      uids.push(key);
    });
    if (gamersArray.length === teamSize) {
      console.log(gamersArray, uids);

      saveGamerDetails(gamersArray, uids);
      setGamers({});
      setIsRegistered(true);
      onCancel();
    }
  };

  const saveGamerDetails = async (gamersArray: GamerData[], uids: string[]) => {
    try {
      if (team && gamersArray) {
        const docRef = await db
          .collection('events')
          .doc(eventId)
          .collection('teams')
          .add({
            inGameLead: team.inGameLead,
            gamers: gamersArray,
            uids,
            teamName: team.teamName,
          });
        setTeamId(docRef.id);
      }
    } catch (err) {
      console.log('Error adding documents in GamerDetails', err);
    }
  };

  return (
    <div className="px-6 py-8 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold">
      <h4 className="text-xl ml-2 mb-4 font-semibold tracking-wide">
        Add Details
      </h4>
      <section className="flex justify-end space-x-5 items-center">
        <FixedButton onClick={handleRegister} name="Register" />
      </section>
      {team &&
        team.gamers.map((gamer, index) => (
          <GamerRegistrationForm
            key={index}
            serialNo={index + 1} //todo
            gamer={gamer}
            gameCode={gameCode}
            updateGamer={updateGamer}
          />
        ))}
    </div>
  );
}
