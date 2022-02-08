import { useState, FC, ChangeEvent } from 'react';
import { EventData } from '@/utilities/eventItem/types';
import axios from 'axios';
import FormInput from '@/components/UI/Inputs/FormInput';
import FixedButton from '@/components/UI/Buttons/FixedButton';
const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  const [bookingPassword, setBookingpassword] = useState<string | undefined>(
    eventData.bookingPassword
  );

  const updateTournamnet = async () => {
    axios.put(`${BASE_URL}/api/events`, {
      _id: eventData._id,
      data: { $set: { bookingPassword } },
    });
  };

  if (
    !eventData.accessibility ||
    (eventData.accessibility && eventData.accessibility === 'Open')
  )
    return null;
  return (
    <div className="mx-auto px-8 flex flex-col font-sans font-semibold">
      <FormInput
        labelName="Enter Password To Book"
        name="bookingPassword"
        placeHolder="Enter Password needed to book"
        value={bookingPassword || ''}
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setBookingpassword(target.value);
        }}
      />
      <div className="flex justify-end relative -mt-8">
        <FixedButton name="Update Password" onClick={updateTournamnet} />
      </div>
    </div>
  );
};

export default RespondToEvent;
