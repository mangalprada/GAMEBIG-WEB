import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { db } from 'firebase/firebaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TeamUpItem from '@/components/Openings/TeamUpItem';
import { TeamUpPost } from '@/utilities/openings/TeamUpPost';
import { BasicUserType } from '@/utilities/types';
import TextButton from '@/components/UI/Buttons/TextButton';
import HorizontalProfile from '@/components/Profile/HorizontalProfile';
import FixedButton from '@/components/UI/Buttons/FixedButton';

export default function Home() {
  const {
    userData: { uid },
  } = useAuth();
  const router = useRouter();
  const { uid: uidFromQuery, postId } = router.query;
  const [teamupPost, setTeamUpPost] = useState<TeamUpPost>();
  const [joinees, setJoinees] = useState<BasicUserType[]>([]);

  useEffect(() => {
    if (typeof postId === 'string') {
      db.collection('teamOpening')
        .doc(postId)
        .get()
        .then((doc) => {
          setTeamUpPost(doc.data() as TeamUpPost);
        })
        .catch((err) => {
          console.log(err);
        });

      if (uid === uidFromQuery) {
        try {
          db.collection('teamOpening')
            .doc(postId)
            .collection('joinees')
            .onSnapshot((querySnapshot) => {
              const users: BasicUserType[] = [];
              querySnapshot.forEach((doc) => {
                users.push({
                  ...(doc.data() as BasicUserType),
                  docId: doc.id,
                });
              });
              setJoinees(users);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [postId, uid, uidFromQuery]);

  function message(joinee: BasicUserType) {
    const stringifiedData: string = JSON.stringify(joinee);
    router.push({
      pathname: `/messages`,
      query: { receiver: stringifiedData },
    });
  }

  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>My posts</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="flex justify-start md:w-2/3 mx-auto px-2">
          <TextButton name="Go Back" type="normal" onClick={router.back} />
        </div>
        <div>{teamupPost ? <TeamUpItem data={teamupPost} /> : null}</div>
        <div>
          {joinees.length > 0 ? (
            <div className="xl:w-1/2 lg:w-2/3 md:w-5/6 w-11/12 mx-auto">
              {joinees.map((joinee) => (
                <div
                  key={joinee.uid}
                  className="w-full py-1 bg-gray-800 rounded-md flex justify-between pr-8"
                >
                  <HorizontalProfile user={joinee} />
                  <FixedButton
                    name="Message"
                    type="button"
                    onClick={() => message(joinee)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <span className="text-center text-gray-300 font-sans font-semibold text-lg">
                No one has applied to join you yet
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
