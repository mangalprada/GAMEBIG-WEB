import { FC } from 'react';
import UserInfo from './UserInfo';
import TabNavigator from '../Navigation/TabNavigation/TabNavigator';
import { UserData } from '../../utilities/types';

type Props = {
  userData: UserData;
};

const ProfileHeader: FC<Props> = ({ userData }: Props) => {
  const followeesCount =
    userData.followeesCount && userData.followeesCount > 0
      ? ` (${userData.followeesCount})`
      : '';

  const followersCount =
    userData.followersCount && userData.followersCount > 0
      ? ` (${userData.followersCount})`
      : '';

  const tabs = [
    {
      label: 'Games',
      href: `/profile/${userData.username}`,
      pathName: '/profile/[username]',
    },
    {
      label: 'Events',
      href: `/profile/${userData.username}/events`,
      pathName: '/profile/[username]/events',
    },
    {
      label: 'Teams',
      href: `/profile/${userData.username}/teams`,
      pathName: '/profile/[username]/teams',
    },
    {
      label: 'Following' + followeesCount,
      href: `/profile/${userData.username}/following`,
      pathName: '/profile/[username]/following',
    },
    {
      label: 'Followers' + followersCount,
      href: `/profile/${userData.username}/followers`,
      pathName: '/profile/[username]/followers',
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
