import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import { db } from 'firebase/firebaseClient';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TeamUpItem from '../../../../components/Join/TeamUpItem';
import { JoinPostType } from '@/utilities/join/JoinPostType';
import { BasicUserType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';

export default function Home() {
  const {
    userData: { uid },
  } = useAuth();
  const router = useRouter();
  const { uid: uidFromQuery, postId } = router.query;
  const [teamUpjoinee, setTeamUpjoinee] = useState<JoinPostType>();
  const [joinees, setJoinees] = useState<BasicUserType[]>();

  useEffect(() => {
    if (typeof postId === 'string') {
      db.collection('join')
        .doc(postId)
        .get()
        .then((doc) => {
          setTeamUpjoinee(doc.data() as JoinPostType);
        })
        .catch((err) => {
          console.log(err);
        });
      if (uid === uidFromQuery) {
        const joinees: BasicUserType[] = [];
        db.collection('join')
          .doc(postId)
          .collection('joinees')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              joinees.push({
                ...(doc.data() as BasicUserType),
                docId: doc.id,
              });
            });
            setJoinees(joinees);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [postId, uid, uidFromQuery]);

  const openProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>My posts</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="xl:w-1/2 md:w-5/6 w-11/12 mx-auto font-sans my-2">
          <FixedButton name="Back" isDangerous onClick={() => router.back()} />
        </div>
        <div>{teamUpjoinee ? <TeamUpItem data={teamUpjoinee} /> : null}</div>
        <div>
          {joinees?.map((joinee) => {
            <div className="flex items-center justify-between px-3 mb-8 rounded-lg border-2 border-gray-800 ">
              <section
                className="flex gap-3 items-center justify-start "
                onClick={() => openProfile(joinee.username)}
              >
                {joinee.photoURL ? (
                  <div className="relative h-10 w-10 md:h-14 md:w-14 cursor-pointer">
                    <Image
                      src={joinee.photoURL}
                      alt="Picture"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                ) : null}
                <section className="flex flex-col cursor-pointer">
                  <span className="font-semibold text-sm  md:text-lg text-gray-300 hover:text-indigo-600">
                    {joinee.name}
                  </span>
                  <span className="font-semibold text-gray-500 text-xs md:text-base">
                    @{joinee.username}
                  </span>
                </section>
              </section>
              <FixedButton name="Follow" />
              <FixedButton name="Message" />
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
