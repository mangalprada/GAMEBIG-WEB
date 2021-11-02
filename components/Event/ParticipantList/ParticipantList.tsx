import { useEffect, useState, useCallback } from 'react';
import { fetchParticipatedTeams } from '../../../libs/getEventData';

interface Props {
  tId: string;
}

export default function ParticipantList({ tId }: Props) {
  const [participants, setParticipants] = useState<Record<string, any>[] | []>(
    []
  );

  const teamsArr = useCallback(async () => {
    const teams = await fetchParticipatedTeams(tId);

    setParticipants(teams);
  }, [tId]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  const tableCell = participants.map((team) => {
    let teamMates = '';
    team.players.map((player: string) => {
      if (teamMates === '') {
        teamMates = teamMates + player;
      } else {
        teamMates = teamMates + ',  ' + player;
      }
    });
    console.log(team, teamMates);

    return (
      <tr key={team.leader}>
        <td className="px-5 py-2 font-semibold">{team.teamName}</td>
        <td className="px-5 py-2 font-semibold">{teamMates}</td>
      </tr>
    );
  });

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
        <table
          className={
            'table-fixed w-auto text-center text-gray-300 ' +
            'bg-gray-900 rounded-lg font-sans tracking-wide'
          }
        >
          <thead>
            <tr>
              <th className="w-1/3 px-5 pt-3 text-indigo-600">Team Name</th>
              <th className="w-2/3 px-5 pt-3 text-indigo-600">Player IDs</th>
            </tr>
          </thead>
          <tbody>{tableCell}</tbody>
        </table>
      )}
    </div>
  );
}
