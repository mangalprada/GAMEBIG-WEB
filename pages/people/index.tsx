import Head from 'next/head';
import getUsers from '@/libs/getUsers';
import { GetServerSidePropsContext } from 'next';
import ProfileCard from '../../components/Profile/ProfileCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { UserData } from '../../utilities/types';

type Props = {
  users: UserData[];
};

const People = ({ users }: Props) => {
  return (
    <div>
      <Head>
        <title>People</title>
        <meta
          name="description"
          content="Find Gamers Like you, connect with them!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
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
    </div>
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
