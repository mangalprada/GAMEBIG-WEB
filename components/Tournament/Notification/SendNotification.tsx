import { useState } from 'react';
import { db, functions } from '../../../firebase/firebaseClient';
import { TournamentData } from '../../../utilities/tournament/types';

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
    <div className="max-w-md ml-3 my-10">
      <h5 className="text-xl font-medium tracking-wide text-gray-400">
        Send Room ID and Password
      </h5>
      <div className="flex justify-between flex-wrap mt-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-2">
            Room ID
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
            id="roomId"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-base font-medium mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-semibold"
            id="roomPass"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white 
            font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={onBtnClickHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
}
