import { useState, FC, ChangeEvent } from 'react';
import { EventData } from '@/utilities/eventItem/types';
import axios from 'axios';
import FormInput from '@/components/UI/Inputs/FormInput';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { useUI } from '@/context/uiContext';
const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  const { openSnackBar } = useUI();
  const [streamLink, setStreamLink] = useState<string | undefined>(
    eventData.streamLink
  );

  const updateTournamnet = async () => {
    await axios.put(`${BASE_URL}/api/events`, {
      _id: eventData._id,
      data: { $set: { streamLink } },
    });
    openSnackBar({
      label: 'Stream Link Updated',
      message: '',
      type: 'success',
    });
  };

  return (
    <div className="mx-auto px-8 flex flex-col font-sans font-semibold">
      <FormInput
        labelName="Stream Link"
        name="bookingPassword"
        placeHolder="Enter YouTube link to game streaming"
        value={streamLink || ''}
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setStreamLink(target.value);
        }}
      />
      <div className="flex justify-end relative -mt-8">
        <FixedButton name="Save Link" onClick={updateTournamnet} />
      </div>
    </div>
  );
};

export default RespondToEvent;
