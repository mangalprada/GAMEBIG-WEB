import { EventData } from '@/utilities/eventItem/types';
import { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import firebase, { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import GamerRegistrationForm from './GamerRegistrationForm';
interface Props {
  eventData: EventData;
  setIsRegistered: (val: boolean) => void;
}

export default function GamerDetails({ eventData, setIsRegistered }: Props) {
  const { userData } = useAuth();
  const { name, username, uid, photoURL } = userData;
  const [gamers, setGamers] = useState<GamerData[]>([]);

  const updateGamer = (uid: string, gamer: GamerData) => {
    setGamers([gamer]);
  };

  const handleRegister = async () => {
    saveGamerDetails();
    setGamers([]);
    setIsRegistered(true);
  };

  const saveGamerDetails = async () => {
    await db
      .collection('events')
      .doc(eventData._id)
      .collection('participants')
      .add({
        gamers,
        uids: [uid],
      })
      .then(() => {
        setIsRegistered(true);
        updateSlots();
        console.log('Team added');
      })
      .catch((error) => {
        console.log('Error adding documents: ', error);
      });
  };

  function updateSlots() {
    db.collection('events')
      .doc(eventData._id)
      .update({ noOfSlots: firebase.firestore.FieldValue.increment(-1) });
  }

  return (
    <div className="px-6 flex flex-col mx-auto font-sans md:w-1/2 text-gray-300 font-semibold mt-10">
      <span className="font-sans text-xl mb-4">
        Register yourself for ths event
      </span>
      <GamerRegistrationForm
        gamer={{ name, username, photoURL, uid }}
        gameCode={eventData._id}
        updateGamer={updateGamer}
      />
      <FixedButton onClick={handleRegister} name="Register" />
    </div>
  );
}
