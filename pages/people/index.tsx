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
        <div
          className={
            'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
            'gap-3 sm:gap-5 mt-4 mx-auto'
          }
        >
          {users.map((user) => (
            <ProfileCard
              name={user.name}
              username={user.username}
              photoURL={user.photoURL}
              uid={user.uid}
              key={user.uid}
            />
          ))}
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
