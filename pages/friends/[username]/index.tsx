import Head from 'next/head';
import ProfileCard from '../../../components/Friends/ProfileCard';
import TabNavigator from '../../../components/Navigation/TabNavigation/TabNavigator';
import { useAuth } from '../../../context/authContext';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../../utilities/types';

const Friends = ({
  friendsSuggestions,
}: {
  friendsSuggestions: UserData[];
}) => {
  const { userData } = useAuth();
  const tabs = [
    {
      label: 'Suggestions',
      href: `/friends`,
      pathName: '/friends',
    },
    {
      label: 'Friends',
      href: `/friends/${userData.username}`,
      pathName: '/friends/[username]',
    },
  ];
  return (
    <Aux>
      <Head>
        <title>Friends</title>
        <meta name="description" content="Friends List" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-col">
        <div className="mt-2">
          <TabNavigator tabs={tabs} />
        </div>
        <div className="font-sans text-gray-300 ">
          <span>Comming Soon...</span>
        </div>
      </div>
    </Aux>
  );
};

export default Friends;
