import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import ProfileCard from '../../components/Friends/ProfileCard';
import TabNavigator from '../../components/Navigation/TabNavigation/TabNavigator';
import { useAuth } from '../../context/authContext';
import { firebaseAdmin } from '../../firebase/firebaseAdmin';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { FriendRequest } from '../../utilities/friends/friends';
import { UserData } from '../../utilities/types';

const Friends = ({
  friendsSuggestions,
}: {
  friendsSuggestions: UserData[];
}) => {
  const { userData, receivedFriendRequests } = useAuth();
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
      <div>
        <div className="mt-2">
          <TabNavigator tabs={tabs} />
        </div>
        <div className="max-w-full flex flex-wrap gap-4 justify-center mt-4 pt-1">
          <h1 className="text-2xl font-bold">Friend Requests</h1>
          {receivedFriendRequests &&
            receivedFriendRequests.map((friendRequest) => (
              <div key={friendRequest.sender.uid}>
                <ProfileCard
                  about={friendRequest.sender.about}
                  games={[]}
                  username={friendRequest.sender.username}
                  photoURL={friendRequest.sender.photoURL}
                  uid={friendRequest.sender.uid}
                  to={friendRequest.to}
                  id={friendRequest.id}
                />
              </div>
            ))}
        </div>
        <div className="max-w-full flex flex-wrap gap-4 justify-center mt-4 pt-1">
          <h1 className="text-2xl font-bold">Suggestions</h1>
          {friendsSuggestions.map((suggestion) => (
            <div key={suggestion.uid}>
              <ProfileCard
                about={suggestion.about}
                games={[]}
                username={suggestion.username}
                photoURL={suggestion.photoURL}
                uid={suggestion.uid}
              />
            </div>
          ))}
        </div>
      </div>
    </Aux>
  );
};

export default Friends;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const friendsSuggestions: UserData[] = [];

  await firebaseAdmin
    .firestore()
    .collection('users')
    .limit(40)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        friendsSuggestions.push(doc.data() as UserData)
      )
    )
    .catch((err) => console.log(err));

  return {
    props: { friendsSuggestions },
  };
}
