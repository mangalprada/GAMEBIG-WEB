import { useState } from 'react';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';
import TextButton from '../UI/Buttons/TextButton';

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
    message: { label: '', message: '' },
    severity: 'success' as const,
  });

  const deleteTeam = async () => {
    try {
      await db.collection('teams').doc(team.docId).delete();
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: { label: 'Deleted', message: `${team.teamName} deleted!` },
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
      className={
        'flex flex-col my-2 py-4 px-8 justify-center text-lg ' +
        'text-gray-300 font-sans font-semibold rounded-lg bg-gray-900 '
      }
    >
      <h6 className="text-3xl text-indigo-600 mb-2">{team.teamName}</h6>
      <div>
        {team.gamers.map((gamer, index) => (
          <div key={index} className="flex justify-between flex-wrap py-1">
            <h6>
              {index + 1}. {gamer}
            </h6>
            {gamer === team.inGameLead ? (
              <div className="bg-red-500 rounded-md py-0.5 px-3 ">
                <span className="text-lg text-black">IGL</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <TextButton type="normal" name="Edit" onClick={handleEdit} />
        <TextButton type="fail" name="Delete" onClick={deleteTeam} />
      </div>
    </div>
  );
}
