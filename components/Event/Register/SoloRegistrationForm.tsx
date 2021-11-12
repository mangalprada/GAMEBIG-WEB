import { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerRegistrationForm from './GamerRegistrationForm';
interface Props {
  tId: string;
  gameCode: string;
  setIsRegistered: (val: boolean) => void;
}

export default function GamerDetails({
  tId,
  gameCode,
  setIsRegistered,
}: Props) {
  const { userData } = useAuth();
  const { name, username, uid, photoURL } = userData;
  const [gamers, setGamers] = useState({} as Record<string, GamerData>);

  const updateGamer = (username: string, gamer: GamerData) => {
    gamers[username] = gamer;
  };

  const handleRegister = async () => {
    const gamersArray: GamerData[] = [];
    Object.keys(gamers).map(function (key) {
      gamersArray.push({ username: key, ...gamers[key] });
    });
    saveGamerDetails(gamersArray);
    setGamers({});
    setIsRegistered(true);
  };

  const saveGamerDetails = (gamersArray: GamerData[]) => {
    const usernames = gamersArray.map((gamer) => gamer.username);
    db.collection('events')
      .doc(tId)
      .collection('teams')
      .add({
        gamers: gamersArray,
        usernames,
        teamName: usernames[0],
      })
      .then(() => {
        setIsRegistered(true);
        console.log('Team added');
      })
      .catch((error) => {
        console.log('Error adding documents: ', error);
      });
  };

  return (
    <div className="px-6 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold mt-10">
      <GamerRegistrationForm
        gamer={{ name, username, photoURL, uid }}
        gameCode={gameCode}
        updateGamer={updateGamer}
      />
      <FixedButton onClick={handleRegister} name="Register" />
    </div>
  );
}
