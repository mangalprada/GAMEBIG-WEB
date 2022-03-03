import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';
import OrgCard from '../../components/Page/OrgCard';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ExploreTabs from '@/components/Event/others/ExploreTabs';
import { UserData } from '../../utilities/types';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import { PageFormData } from '@/utilities/page/types';
import PageHeader from '@/components/Page/PageHeader/PageHeader';

const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.data;
};

const People = () => {
  const { data: orgs } = useSWR(`${BASE_URL}/api/page/pages`, fetcher);

  if (!orgs) return <LurkingCat height={300} width={300} />;

  return (
    <div>
      <Head>
        <title>Explore</title>
        <meta
          name="description"
          content="Check out our organizers, Find Gamers Like you and connect with them!"
          key={'description'}
        />

        <meta property="og-url" content="https://www.gamebig.in/explore" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ExploreTabs />
        {orgs.map((org: PageFormData) => (
          <div className="w-full my-0.5" key={org.id}>
            <PageHeader data={org} />
          </div>
        ))}
      </Aux>
    </div>
  );
};

export default People;
