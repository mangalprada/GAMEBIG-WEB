import { useState } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerItem from './GamerItem';
interface Props {
  eventId: string;
  teamSize: number;
  team?: TeamType;
  gameCode: string;
  onCancel: () => void;
  setIsRegistered: (val: boolean) => void;
}

export default function GamerDetails({
  eventId,
  teamSize,
  team,
  gameCode,
  onCancel,
  setIsRegistered,
}: Props) {
  const [gamers, setGamers] = useState({} as Record<string, GamerData>);

  const updateGamer = (username: string, gamer: GamerData) => {
    gamers[username] = gamer;
  };

  const handleRegister = async () => {
    const gamersArray: GamerData[] = [];
    Object.keys(gamers).map(function (key) {
      gamersArray.push({ username: key, ...gamers[key] });
    });
    if (gamersArray.length === teamSize) {
      saveGamerDetails(gamersArray);
      setGamers({});
      setIsRegistered(true);
      onCancel();
    }
  };

  const saveGamerDetails = (gamersArray: GamerData[]) => {
    const usernames = gamersArray.map((gamer) => gamer.username);
    if (team && gamersArray) {
      db.collection('events')
        .doc(eventId)
        .collection('teams')
        .add({
          inGameLead: team.inGameLead,
          gamers: gamersArray,
          usernames,
          teamName: team.teamName,
        })
        .then(() => {
          console.log('Team added');
        })
        .catch((error) => {
          console.log('Error adding documents: ', error);
        });
    }
  };

  return (
    <div className="px-6 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold">
      <div className="flex justify-start gap-8 items-center">
        <span>Add Details</span>
        <span onClick={onCancel} className="hover:bg-gray-800 p-3 rounded-md">
          Cancel
        </span>
        <FixedButton onClick={handleRegister} name="Register" />
      </div>
      {team &&
        team.gamers.map((gamer, index) => (
          <GamerItem
            key={index}
            serialNo={index + 1}
            username={gamer}
            gameCode={gameCode}
            updateGamer={updateGamer}
          />
        ))}
    </div>
  );
}
