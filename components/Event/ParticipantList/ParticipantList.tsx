import TeamItem from '@/components/Profile/TeamItem';
import { TeamType } from '@/utilities/types';
import { useEffect, useState, useCallback } from 'react';
import { fetchParticipatedTeams } from '../../../libs/getEventData';

interface Props {
  eventId: string;
}

export default function ParticipantList({ eventId }: Props) {
  const [participants, setParticipants] = useState<TeamType[]>([]);

  const teamsArr = useCallback(async () => {
    const teams = await fetchParticipatedTeams(eventId);
    setParticipants(teams);
  }, [eventId]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  return (
    <div className="mx-4">
      <h5 className="text-gray-400 text-xl font-semibold mb-5">
        Participant List
      </h5>
      {participants.length === 0 ? (
        <span className="text-lg font-semibold text-indigo-600">
          No Teams registered yet
        </span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {participants.map((team) => (
            <div key={team.docId}>
              <TeamItem team={team} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
