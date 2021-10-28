import { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerItem from './GamerItem';
interface Props {
  tId: string;
  gameCode: string;
  setIsRegistered?: (val: boolean) => void;
}

export default function GamerDetails({
  tId,
  gameCode,
  setIsRegistered,
}: Props) {
  const { userData } = useAuth();
  const [gamers, setGamers] = useState({} as Record<string, GamerData>);

  const updateGamer = (username: string, gamer: GamerData) => {
    gamers[username] = gamer;
  };

  // const handleRegister = async () => {
  //   const gamersArray: GamerData[] = [];
  //   Object.keys(gamers).map(function (key) {
  //     gamersArray.push({ username: key, ...gamers[key] });
  //   });
  //   if (gamersArray.length > 3) {
  //     saveGamerDetails(gamersArray);
  //     setGamers({});
  //    setIsRegistered && setIsRegistered(true);
  //     onCancel();
  //   }
  // };

  // const saveGamerDetails = (gamersArray: GamerData[]) => {
  //   const usernames = gamersArray.map((gamer) => gamer.username);
  //   if (team && gamersArray) {
  //     db.collection('events')
  //       .doc(tId)
  //       .collection('teams')
  //       .add({
  //         inGameLead: team.inGameLead,
  //         gamers: gamersArray,
  //         usernames,
  //         teamName: team.teamName,
  //       })
  //       .then(() => {
  //         console.log('Team added');
  //       })
  //       .catch((error) => {
  //         console.log('Error adding documents: ', error);
  //       });
  //   }
  // };

  return (
    <div className="px-6 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold">
      <GamerItem
        username={userData.username}
        gameCode={gameCode}
        updateGamer={updateGamer}
      />
      <FixedButton
        onClickHandler={() => {
          console.log('clicked');
        }}
        name="Register"
      />
    </div>
  );
}
