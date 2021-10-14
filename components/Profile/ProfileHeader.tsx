import { FC } from 'react';
import PersonalInfo from './ProfileInfo';
import TabNavigator from '../Navigation/TabNavigation/TabNavigator';
import { UserData } from '../../utilities/types';

type Props = {
  userData: UserData;
};

const ProfileHeader: FC<Props> = ({ userData }: Props) => {
  const tabs = [
    {
      label: 'Games',
      href: `/profile/${userData.username}`,
      pathName: '/profile/[username]',
    },
    {
      label: 'Teams',
      href: `/profile/${userData.username}/teams`,
      pathName: '/profile/[username]/teams',
    },
  ];
  return (
    <div>
      <PersonalInfo userData={userData} />
      <TabNavigator tabs={tabs} />
    </div>
  );
};

export default ProfileHeader;
