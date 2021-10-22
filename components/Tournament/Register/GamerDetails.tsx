import { useState } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import GamerItem from './GamerItem';
interface Props {
  tId: string;
  team?: TeamType;
  gameCode: string;
  onCancel: () => void;
  setIsRegistered: (val: boolean) => void;
}

export default function GamerDetails({
  tId,
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
    if (gamersArray.length > 3) {
      saveGamerDetails(gamersArray);
      setGamers({});
      setIsRegistered(true);
      onCancel();
    }
  };

  const saveGamerDetails = (gamersArray: GamerData[]) => {
    const usernames = gamersArray.map((gamer) => gamer.username);
    if (team && gamersArray) {
      db.collection('tournaments')
        .doc(tId)
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
    <div>
      <h2>Add Details</h2>
      {team &&
        team.gamers.map((gamer) => (
          <GamerItem
            key={gamer}
            username={gamer}
            gameCode={gameCode}
            updateGamer={updateGamer}
          />
        ))}
      <div className="">
        <span onClick={onCancel} className="">
          Cancel
        </span>
        <span onClick={handleRegister} className="">
          Register
        </span>
      </div>
    </div>
  );
}
