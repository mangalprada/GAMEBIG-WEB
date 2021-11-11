import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Head from 'next/head';
import TeamUpItem from '../../../components/Join/TeamUpItem';
import { db } from 'firebase/firebaseClient';
import { JoinPostType } from '@/utilities/join/JoinPostType';

export default function MyPosts() {
  const [posts, setPosts] = useState<JoinPostType[]>([]);
  const {
    userData: { uid },
  } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      db.collection('join')
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) => {
          const posts: JoinPostType[] = [];
          querySnapshot.forEach((doc) => {
            posts.push({ ...(doc.data() as JoinPostType), id: doc.id });
          });
          setPosts(posts);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPosts();
  }, [uid]);

  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>My posts</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="mt-8">
          {posts.map((post) => (
            <div key={post.id}>
              <TeamUpItem data={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
