import axios from 'axios';
import { SetStateAction, useState } from 'react';
import { EventData } from '../../../utilities/eventItem/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import NormalInput from '../../UI/Inputs/NormalInput';
const { BASE_URL } = process.env;

export default function SendNotification({
  eventData,
}: {
  eventData: EventData;
}) {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');

  const updateTournamnet = async () => {
    axios.put(`${BASE_URL}/api/events`, {
      _id: eventData._id,
      data: { $set: { roomId, password } },
    });
  };

  const sendNotification = async () => {};

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
        <FixedButton name="Send" onClick={onBtnClickHandler} />
      </div>
    </div>
  );
}
