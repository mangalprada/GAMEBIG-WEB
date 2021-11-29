import { useUI } from '@/context/uiContext';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';
import TextButton from '../UI/Buttons/TextButton';
import HorizontalProfile from '../Profile/HorizontalProfile';
import FixedButton from '../UI/Buttons/FixedButton';
import { useAuth } from '@/context/authContext';
import { notifyUser } from '@/libs/notifications';
import { updateTeam } from '@/libs/teams';

type Props = {
  team: TeamType;
  removeTeam?: (id: string) => void;
  openModal?: () => void;
  addTeam?: (team: TeamType) => void;
  setSelectedTeam?: (team: TeamType) => void;
};

export default function TeamItem({
  team,
  removeTeam,
  openModal,
  setSelectedTeam,
  addTeam,
}: Props) {
  const { openSnackBar } = useUI();
  const { userData } = useAuth();

  const deleteInvitation = async () => {
    if (team.invitedGamers && team.invitedUids) {
      const updatedInvitedUids = team.invitedUids.filter(
        (e) => e !== userData.uid
      );
      const updatedInvitedGamers = team.invitedGamers.filter(
        (e) => e.uid !== userData.uid
      );
      try {
        if (team.docId) {
          const newTeam = {
            ...team,
            invitedUids: updatedInvitedUids,
            invitedGamers: updatedInvitedGamers,
          };
          updateTeam({
            teamId: team.docId,
            team: newTeam,
          });
        }
        openSnackBar({
          label: 'Deleted',
          message: `Invitation from ${team.teamName} is deleted!`,
          type: 'success',
        });
        team.uids.forEach((uid) => {
          notifyUser({
            uid,
            message: `${userData.name} declined invitation to join ${team.teamName}`,
            type: 'TEAM',
          });
        });
        if (team.docId && removeTeam) removeTeam(team.docId);
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const acceptInvitation = async () => {
    if (team.invitedGamers && team.invitedUids) {
      const updatedInvitedUids = team.invitedUids.filter(
        (e) => e !== userData.uid
      );
      const updatedInvitedGamers = team.invitedGamers.filter(
        (e) => e.uid !== userData.uid
      );
      const updatedGamers = [
        ...team.gamers,
        {
          name: userData.name,
          uid: userData.uid,
          photoURL: userData.photoURL,
          username: userData.username,
        },
      ];
      const updatedUids = [...team.uids, userData.uid];
      const newteam: TeamType = {
        ...team,
        gamers: updatedGamers,
        invitedUids: updatedInvitedUids,
        invitedGamers: updatedInvitedGamers,
        uids: updatedUids,
      };
      try {
        if (team.docId) {
          updateTeam({
            teamId: team.docId,
            team: newteam,
          });
        }
        openSnackBar({
          label: 'Accepted',
          message: `Invitation from ${team.teamName} is Accepted!`,
          type: 'success',
        });
        team.uids.forEach((uid) => {
          notifyUser({
            uid,
            message: `${userData.name} accepted invitation to join ${team.teamName}`,
            type: 'TEAM',
          });
        });
        if (team.docId && removeTeam) removeTeam(team.docId);
        if (addTeam) addTeam(newteam);
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const handleEdit = () => {
    if (setSelectedTeam && openModal) {
      setSelectedTeam(team);
      openModal();
    }
  };

  const leaveTeam = () => {
    if (team.uids.length === 1) {
      db.collection('teams').doc(team.docId).delete();
    } else {
      const updatedUids = team.uids.filter((e) => e !== userData.uid);
      let updatedGamers;
      if (team.gamers) {
        updatedGamers = team.gamers.filter((e) => e.uid !== userData.uid);
      }
      if (team.docId) {
        const newteam = {
          ...team,
          uids: updatedUids,
          gamers: updatedGamers,
        };
        updateTeam({
          teamId: team.docId,
          team: newteam,
        });
      }
      updatedUids.forEach((uid) => {
        notifyUser({
          uid,
          message: `${userData.name} left ${team.teamName}`,
          type: 'TEAM',
        });
      });
      openSnackBar({
        label: 'Left',
        message: `You left ${team.teamName}`,
        type: 'success',
      });
    }
    if (team.docId && removeTeam) removeTeam(team.docId);
  };

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
      {(team.uids?.includes(userData.uid) ||
        team.invitedUids?.includes(userData.uid)) && (
        <div>
          <h6 className="text-lg text-gray-300 mx-4 mb-2">Invited Gamers</h6>
          {team.invitedGamers &&
            team.invitedGamers.map((gamer, index) => (
              <div key={index}>
                <HorizontalProfile user={gamer} />
              </div>
            ))}
        </div>
      )}
      {team.invitedUids?.includes(userData.uid) && (
        <div className="flex justify-end px-4 gap-4">
          <TextButton type="fail" name="Delete" onClick={deleteInvitation} />
          <FixedButton type="button" name="Accept" onClick={acceptInvitation} />
        </div>
      )}
      {team.uids?.includes(userData.uid) && (
        <div className="flex justify-end px-4 gap-4">
          <TextButton type="fail" name="Leave" onClick={leaveTeam} />
          <TextButton type="normal" name="Edit" onClick={handleEdit} />
        </div>
      )}
    </div>
  );
}
