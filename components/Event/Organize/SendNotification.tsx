import { useUI } from '@/context/uiContext';
import axios from 'axios';
import { useState, ChangeEvent } from 'react';
import { EventData } from '../../../utilities/eventItem/types';
import FixedButton from '../../UI/Buttons/FixedButton';
import NormalInput from '../../UI/Inputs/NormalInput';
const { BASE_URL } = process.env;

export default function SendNotification({
  eventData,
}: {
  eventData: EventData;
}) {
  const { openSnackBar } = useUI();
  const [roomId, setRoomId] = useState<string | undefined>(eventData.roomId);
  const [password, setPassword] = useState<string | undefined>(
    eventData.password
  );

  const updateTournamnet = async () => {
    await axios.put(`${BASE_URL}/api/events`, {
      _id: eventData._id,
      data: { $set: { roomId, password } },
    });
    openSnackBar({
      label: 'Room ID and Password Updated',
      message: '',
      type: 'success',
    });
  };

  const sendNotification = async () => {};

  const onBtnClickHandler = () => {
    updateTournamnet();
    sendNotification();
  };

  return (
    <div className="py-10 px-4 mx-auto">
      <h5 className="text-xl font-medium tracking-wide text-gray-400 ml-3">
        Send Room ID and Password
      </h5>
      <div className="grid sm:grid-cols-2 grid-cols-1 mt-5">
        <NormalInput
          name="RoomId"
          value={roomId || ''}
          placeHolder="Room ID"
          onChangeHandler={(e: ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setRoomId(target.value);
          }}
        />
        <NormalInput
          name="password"
          value={password || ''}
          placeHolder="Password"
          onChangeHandler={(e: ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setPassword(target.value);
          }}
        />
      </div>
      <div className="flex justify-end mr-4 relative -mt-8">
        <FixedButton name="Send" onClick={onBtnClickHandler} />
      </div>
    </div>
  );
}
