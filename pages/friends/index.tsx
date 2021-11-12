import { GetServerSidePropsContext } from 'next';
import ProfileCard from '../../components/Friends/ProfileCard';
import { useAuth } from '../../context/authContext';
import { firebaseAdmin } from '../../firebase/firebaseAdmin';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';

type Props = {
  users: UserData[];
};

const FriendsSuggestions = ({ users }: Props) => {
  const { userData, receivedFriendRequests } = useAuth();
  return (
    <Aux>
      <div className="flex flex-col">
        <div className="xl:w-1/2 md:w-5/6 grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4 pt-1 mx-auto">
          {users.map((user) => (
            <div key={user.uid}>
              <ProfileCard
                name={user.name}
                games={[]}
                username={user.username}
                photoURL={user.photoURL}
                uid={user.uid}
              />
            </div>
          ))}
        </div>
      </div>
    </Aux>
  );
};

export default FriendsSuggestions;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const users: UserData[] = [];
  await firebaseAdmin
    .firestore()
    .collection('users')
    .limit(30)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => users.push(doc.data() as UserData))
    )
    .catch((err) => console.log(err));
  return {
    props: { users },
  };
}
