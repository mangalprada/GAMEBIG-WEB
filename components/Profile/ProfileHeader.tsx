import PersonalInfo from './ProfileInfo';
import TabNavigator from '../Navigation/TabNavigation/TabNavigator';
import { UserData } from '../../utilities/types';

function ProfileHeader({
  userData,
  tabNumber,
}: {
  userData: UserData;
  tabNumber: number;
}) {
  const tabs = [
    { label: 'Games', href: `/profile/${userData.uid}/` },
    { label: 'Teams', href: `/profile/${userData.uid}/teams` },
  ];
  return (
    <div>
      <PersonalInfo userData={userData} />
      <TabNavigator tabNumber={tabNumber} tabs={tabs} />
    </div>
  );
}

export default ProfileHeader;
