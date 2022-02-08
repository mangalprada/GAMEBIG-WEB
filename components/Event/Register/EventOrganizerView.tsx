import { useState, useEffect, useCallback, FC, ChangeEvent } from 'react';
import SendNotification from '../Organize/SendNotification';
import UpdateBookingPassword from '../Organize/UpdateBookingPassword';
import AddStreaming from '../Organize/AddStreaming';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';
import axios from 'axios';
import FormInput from '@/components/UI/Inputs/FormInput';
import FixedButton from '@/components/UI/Buttons/FixedButton';
const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  const [participants, setParticipants] = useState<TeamType[]>([]);
  const [bookingPassword, setBookingpassword] = useState<string | null>(null);

  const teamsArr = useCallback(async () => {
    const response = await axios.get(`${BASE_URL}/api/participants`, {
      params: { eventId: eventData._id },
    });
    setParticipants(response.data.message);
  }, [eventData._id]);

  useEffect(() => {
    // teamsArr();
  }, [teamsArr]);

  return (
    <div className="bg-slate-900 rounded-md w-11/12 mx-auto pb-4">
      <SendNotification eventData={eventData} />
      <UpdateBookingPassword eventData={eventData} />
      <AddStreaming eventData={eventData} />
    </div>
  );
};

export default RespondToEvent;
