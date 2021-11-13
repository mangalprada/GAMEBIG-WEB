import getUsers from '@/libs/getUsers';
import { GetServerSidePropsContext } from 'next';
import ProfileCard from '../../components/Friends/ProfileCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';

type Props = {
  users: UserData[];
};

const People = ({ users }: Props) => {
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

export default People;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let users: UserData[] = [];
  users = await getUsers();
  return {
    props: { users },
  };
}
