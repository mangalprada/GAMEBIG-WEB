import { useState, useEffect, useCallback, FC } from 'react';
import SendNotification from '../Notification/SendNotification';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';
import EventResultForm from '../Result/EventResultForm';
import axios from 'axios';
const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  const [participants, setParticipants] = useState<TeamType[]>([]);

  const teamsArr = useCallback(async () => {
    const response = await axios.get(`${BASE_URL}/api/participants`, {
      params: { eventId: eventData._id },
    });
    setParticipants(response.data.message);
  }, [eventData._id]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  return (
    <div>
      <SendNotification eventData={eventData} />
      {/* <EventResultForm eventId={eventData._id} participants={participants} /> */}
    </div>
  );
};

export default RespondToEvent;
