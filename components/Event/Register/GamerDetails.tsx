import { useState, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerItem from './GamerItem';

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

  const saveGamerDetails = async (gamersArray: GamerData[]) => {
    const usernames = gamersArray.map((gamer) => gamer.username);
    try {
      if (team && gamersArray) {
        const docRef = await db
          .collection('events')
          .doc(eventId)
          .collection('teams')
          .add({
            inGameLead: team.inGameLead,
            gamers: gamersArray,
            usernames,
            teamName: team.teamName,
          });
        setTeamId(docRef.id);
      }
    } catch (err) {
      console.log('Error adding documents in GamerDetails', err);
    }
  };

  return (
    <div className="px-6 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold">
      <h4 className="text-xl ml-2 mb-4 font-semibold tracking-wide">
        Add Details
      </h4>
      <section className="flex justify-start space-x-5 items-center">
        <span
          onClick={onCancel}
          className="hover:bg-gray-800 px-4 py-2 rounded-md text-lg cursor-pointer"
        >
          Cancel
        </span>
        <FixedButton onClick={handleRegister} name="Register" />
      </section>
      {/* {team &&
        team.gamers.map((gamer, index) => (
          <GamerItem
            key={index}
            serialNo={index + 1} //todo
            username={gamer}
            gameCode={gameCode}
            updateGamer={updateGamer}
          />
        ))} */}
    </div>
  );
}
