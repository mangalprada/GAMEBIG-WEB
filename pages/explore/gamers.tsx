import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';
import ProfileCard from '../../components/Profile/ProfileCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ExploreTabs from '@/components/Event/others/ExploreTabs';
import { UserData } from '../../utilities/types';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';

const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.users;
};

const People = () => {
  const { data: users } = useSWR(`${BASE_URL}/api/people`, fetcher);

  if (!users) return <LurkingCat height={300} width={300} />;

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
        <ExploreTabs />
        <div
          className={
            'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
            'gap-3 sm:gap-5 mt-3 mx-auto'
          }
        >
          {users.map((user: UserData) => (
            <ProfileCard user={user} key={user.uid} />
          ))}
        </div>
      </Aux>
    </div>
  );
};

export default People;
