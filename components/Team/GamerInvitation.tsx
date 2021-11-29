import { ChangeEvent, useState } from 'react';
import { db } from '../../firebase/firebaseClient';
import { BasicUserType, TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import { searchUser } from '@/libs/algolia';
import debounce from '@/libs/debounce';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';
import GamersList from './GamersList';
import { notifyUser } from '@/libs/notifications';
import { updateTeam } from '@/libs/teams';

type PropsType = {
  teamData?: TeamType;
  teamId: string;
  onCancel: () => void;
  setPart: (num: number) => void;
};

export default function CreateTeam({
  teamData,
  onCancel,
  teamId,
  setPart,
}: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const [gamers, setgamers] = useState<BasicUserType[]>(
    teamData?.gamers || [
      {
        uid: userData.uid,
        username: userData.username,
        name: userData.name,
        photoURL: userData.photoURL,
      },
    ]
  );
  const [invitedGamers, setInvitedGamers] = useState<BasicUserType[]>(
    teamData?.invitedGamers || []
  );
  const [query, setQuery] = useState('');
  const [searchResults, setSearchresults] = useState<BasicUserType[]>([]);

  const inviteGamer = async (user: BasicUserType) => {
    if (
      invitedGamers.find((o) => (o.uid === user.uid ? true : false)) ||
      gamers.find((o) => (o.uid === user.uid ? true : false))
    ) {
      return;
    }
    setInvitedGamers([...invitedGamers, user]);
  };

  const removeGamer = (user: BasicUserType) => {
    const newgamers = gamers.filter((gamer) => gamer.uid !== user.uid);
    setgamers(newgamers);
  };

  const removeInvitedGamer = (user: BasicUserType) => {
    const gamers = invitedGamers.filter((gamer) => gamer.uid !== user.uid);
    setInvitedGamers(gamers);
  };

  const save = async () => {
    const newTeam = {
      gamers,
      invitedGamers,
      uids: gamers.map((gamer) => gamer.uid),
      invitedUids: invitedGamers.map((gamer) => gamer.uid),
    };
    updateTeam({
      teamId: teamId,
      team: newTeam,
    });
    invitedGamers.map((user) => {
      notifyUser({
        uid: user.uid,
        message: `${userData.name} invited you to join his team`,
        type: 'TEAM',
      });
    });
    openSnackBar({
      label: 'Invitation sent',
      message: '',
      type: 'success',
    });
    onCancel();
  };

  const handleChane = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
    const debouncedGetSearch = debounce(async () => {
      const users: BasicUserType[] = await searchUser(target.value);
      if (users.length > 0) setSearchresults(users);
    }, 500);
    if (target.value.trim() !== '') {
      debouncedGetSearch();
    } else {
      setSearchresults([]);
    }
  };

  return (
    <div className="rounded-lg w-full h-full text-gray-300 font-sans font-semibold flex flex-col">
      <span className="text-2xl text-center mb-8">
        Invite Gamers to Join your Team
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col mx-8">
          <div className="w-full">
            <FormInput
              labelName=""
              name="username"
              placeHolder="search username or name"
              value={query}
              onChangeHandler={(e: ChangeEvent) => handleChane(e)}
            />
          </div>
          <GamersList
            header="Search results"
            gamers={searchResults}
            handleItemClick={inviteGamer}
            buttonText="Invite"
            highLightButton={true}
          />
        </div>
        <div className="flex flex-col mx-8">
          <GamersList
            header="Invited Gamers"
            gamers={invitedGamers}
            handleItemClick={removeInvitedGamer}
            buttonText="Remove"
            highLightButton={false}
          />
          <GamersList
            header="Gamers"
            gamers={gamers}
            handleItemClick={removeGamer}
            buttonText="Remove"
            highLightButton={false}
          />
        </div>
      </div>
      <div className="flex justify-evenly w-full py-8">
        <FixedButton type="submit" name="Previous" onClick={() => setPart(0)} />
        <FixedButton type="submit" name="Save" onClick={save} />
      </div>
    </div>
  );
}
