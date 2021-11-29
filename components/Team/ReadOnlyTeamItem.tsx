import { TeamType } from '../../utilities/types';
import HorizontalProfile from '../Profile/HorizontalProfile';

type Props = {
  team: TeamType;
};

export default function TeamItem({ team }: Props) {
  if (!team.teamName && team.gamers.length === 1)
    return <HorizontalProfile user={team.gamers[0]} />;

  return (
    <div
      className={
        'flex flex-col my-1 px-2 py-6 justify-center text-lg ' +
        'text-gray-300 font-sans font-semibold rounded-lg bg-gray-900 '
      }
    >
      <h6 className="text-2xl text-indigo-600 mx-4 mb-2">{team.teamName}</h6>
      <div>
        <h6 className="text-lg text-gray-300 mx-4 mb-2">Gamers</h6>
        {team.gamers.map((gamer, index) => (
          <div key={index}>
            <HorizontalProfile user={gamer} />
          </div>
        ))}
      </div>
    </div>
  );
}
