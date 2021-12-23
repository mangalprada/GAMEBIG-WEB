import { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext, NextPage } from 'next';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData, BasicUserType } from '../../../utilities/types';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import { getGamerData } from '../../../libs/gamerData';
import { db } from 'firebase/firebaseClient';
import ProfileCard from '@/components/Profile/ProfileCard';

type PageProps = {
  userData: UserData;
  savedGames: Record<string, GamerData>;
};

const Games: NextPage<PageProps> = ({ userData, savedGames }) => {
  const [followers, setFollowers] = useState<BasicUserType[]>([]);
  useEffect(() => {
    function getFollowees() {
      let users: BasicUserType[] = [];
      db.collection('users')
        .doc(userData.uid)
        .collection('followers')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data() as BasicUserType;
            if (data) {
              users.push({
                ...data,
                docId: doc.id,
              });
            }
          });
          setFollowers(users);
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    }
    getFollowees();
  }, [userData.uid]);

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
        {followers.length > 0 ? (
          <div
            className={
              'xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 grid grid-cols-2 sm:grid-cols-3 ' +
              'gap-3 sm:gap-5 mt-3 mx-auto'
            }
          >
            {followers.map((user) => (
              <ProfileCard user={user} key={user.uid} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <span className="text-lg text-gray-500 font-medium text-center">
              No Followers
            </span>
          </div>
        )}
      </Aux>
    </div>
  );
};

export default Games;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let savedGames: Record<string, GamerData> = {};
  let userData: UserData = {} as UserData;
  try {
    const { username } = context.query;
    if (typeof username == 'string') {
      userData = await getUser(username);
      savedGames = await getGamerData(userData.uid);
    }

    return {
      props: { userData, savedGames },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
