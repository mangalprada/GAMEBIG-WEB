import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useAuth } from '../../../context/authContext';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import Post from '@/components/Home/Post';

type PageProps = {
  userData: UserData;
  posts: any;
};

const Games: NextPage<PageProps> = ({ userData, posts }) => {
  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content={`${userData.name}'s Profile`}
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Profile" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Check out my profile at GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ProfileHeader userData={userData} />
        <div className="w-11/12 md:w-1/2 mx-auto flex flex-col mt-1">
          {posts &&
            posts.message.map((item: any, index: any) => (
              <div key={index}>
                <Post post={item} />
              </div>
            ))}
        </div>
      </Aux>
    </div>
  );
};

export default Games;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userData: UserData = {} as UserData;
  let posts;
  try {
    const { username } = context.query;
    if (typeof username == 'string') {
      userData = await getUser(username);
      let { BASE_URL } = process.env;
      let response = await fetch(`${BASE_URL}/api/posts/?uid=${userData.uid}`, {
        method: 'GET',
      });
      posts = await response.json();
    }

    return {
      props: { userData, posts },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
