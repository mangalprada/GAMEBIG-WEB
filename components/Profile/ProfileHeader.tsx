import { FC } from 'react';
import UserInfo from './UserInfo';
import TabNavigator from '../Navigation/TabNavigation/TabNavigator';
import { UserData } from '../../utilities/types';

type Props = {
  userData: UserData;
};

const ProfileHeader: FC<Props> = ({ userData }: Props) => {
  const tabs = [
    {
      label: 'Events',
      href: `/profile/${userData.username}`,
      pathName: '/profile/[username]',
    },
    {
      label: 'Games',
      href: `/profile/${userData.username}/games`,
      pathName: '/profile/[username]/games',
    },

    {
      label: 'Teams',
      href: `/profile/${userData.username}/teams`,
      pathName: '/profile/[username]/teams',
    },
  ];
  return (
    <div>
      <UserInfo userData={userData} />
      <TabNavigator tabs={tabs} />
    </div>
  );
};

export default ProfileHeader;
