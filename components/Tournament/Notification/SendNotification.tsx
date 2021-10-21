import { SetStateAction, useState } from 'react';
import { db, functions } from '../../../firebase/firebaseClient';
import { TournamentData } from '../../../utilities/tournament/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import NormalInput from '../../UI/Inputs/NormalInput';

export default function SendNotification({
  tournamentData,
}: {
  tournamentData: TournamentData;
}) {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');

  const updateTournamnet = async () => {
    db.collection('tournaments')
      .doc(tournamentData.id)
      .update({ roomId, password })
      .then(() => {
        console.log('RoomId and Password successfully updated!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNotification = async () => {
    const { linkedOrgId, linkedOrgName, startTime } = tournamentData;
    const sendTournamentMessage = functions.httpsCallable(
      'sendTournamentMessage'
    );
    sendTournamentMessage({
      roomId,
      password,
      tournamnetId: tournamentData.id,
      linkedOrgId,
      linkedOrgName,
      startTime,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log('error sending notification', error);
      });
  };

  const onBtnClickHandler = () => {
    updateTournamnet();
    sendNotification();
    setRoomId('');
    setPassword('');
  };

  return (
    <div className="max-w-md my-10">
      <h5 className="text-xl font-medium tracking-wide text-gray-400 ml-3">
        Send Room ID and Password
      </h5>
      <div className="grid sm:grid-cols-2 grid-cols-1 mt-5">
        <NormalInput
          name="RoomId"
          value={roomId}
          placeHolder="Room ID"
          onChangeHandler={(e: { target: { value: SetStateAction<string> } }) =>
            setRoomId(e.target.value)
          }
        />
        <NormalInput
          name="password"
          value={password}
          placeHolder="Password"
          onChangeHandler={(e: { target: { value: SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <div className="flex justify-start ml-4 relative -mt-8">
        <FixedButton name="Send" onClickHandler={onBtnClickHandler} />
      </div>
    </div>
  );
}
