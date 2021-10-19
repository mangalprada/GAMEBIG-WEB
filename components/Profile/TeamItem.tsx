import { useState } from 'react';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';
import FixedButton from '../UI/Buttons/FixedButton';

export default function TeamItem({
  team,
  removeTeam,
  openBackdrop,
  setSelectedTeam,
}: {
  team: TeamType;
  removeTeam: (id: string) => void;
  openBackdrop: (open: boolean) => void;
  setSelectedTeam: (team: TeamType) => void;
}) {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });

  const deleteTeam = async () => {
    try {
      await db.collection('teams').doc(team.docId).delete();
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${team.teamName} Deleted!`,
      });
      if (team.docId) removeTeam(team.docId);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleEdit = () => {
    setSelectedTeam(team);
    openBackdrop(true);
  };

  return (
    <div
      className="flex flex-col w-11/12 md:w-2/3 mx-auto my-2 py-4 px-8 md:px-24 justify-center text-lg text-gray-300 font-sans font-semibold
    rounded-lg bg-gradient-to-b from-transparent to-gray-900"
    >
      <h6 className="text-3xl text-indigo-600">{team.teamName}</h6>
      <div>
        {team.gamers.map((gamer, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b-2 border-gray-800 "
          >
            <h6>
              {index + 1}. {gamer}
            </h6>
            {gamer === team.inGameLead ? (
              <div className="bg-green-400 rounded-md p-1">
                <span className="mx-1 text-sm text-black">In Game Lead</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-end my-1">
        <span
          className="text-gray-400 p-2 hover:bg-gray-800 rounded-md transition duration-300"
          onClick={handleEdit}
        >
          Edit
        </span>
        <span
          className="text-gray-400 p-2 hover:bg-gray-800 rounded-md transition duration-300"
          onClick={deleteTeam}
        >
          Delete
        </span>
      </div>
    </div>
  );
}
