import { useState } from 'react';
import TeamForm from './TeamForm';
import GamerInvitation from './GamerInvitation';
import { TeamType } from '../../utilities/types';

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
};

export default function CreateTeam({ teamData, onCancel }: PropsType) {
  const [part, setPart] = useState<number>(0);
  const [teamId, setTeamId] = useState<string>('');
  return (
    <div className="bg-gray-900 rounded-lg w-full">
      {
        {
          0: (
            <TeamForm
              teamData={teamData}
              onCancel={onCancel}
              setPart={setPart}
              setTeamId={setTeamId}
            />
          ),
          1: (
            <GamerInvitation
              teamData={teamData}
              onCancel={onCancel}
              setPart={setPart}
              teamId={teamId}
            />
          ),
        }[part]
      }
    </div>
  );
}
