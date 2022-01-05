import { useState, useEffect, useCallback, FC } from 'react';
import SendNotification from '../Notification/SendNotification';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';
import { fetchParticipatedTeams } from '@/libs/getEventData';
import EventResultForm from '../Result/EventResultForm';

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  const [participants, setParticipants] = useState<TeamType[]>([]);

  const teamsArr = useCallback(async () => {
    const teams = await fetchParticipatedTeams(eventData.id);
    setParticipants(teams);
  }, [eventData.id]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  return (
    <div>
      <SendNotification eventData={eventData} />
      <EventResultForm eventId={eventData.id} participants={participants} />
    </div>
  );
};

export default RespondToEvent;
