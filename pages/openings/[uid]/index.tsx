import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';
import Head from 'next/head';
import TeamUpItem from '../../../components/Openings/TeamUpItem';
import Modal from '@/components/UI/Modal/Modal';
import { db } from 'firebase/firebaseClient';
import { TeamUpPost } from '@/utilities/openings/TeamUpPost';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import TextButton from '@/components/UI/Buttons/TextButton';
import CreatePostForm from '@/components/Openings/CreatePostForm';

export default function MyPosts() {
  const [posts, setPosts] = useState<TeamUpPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userData: { uid },
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      try {
        db.collection('teamOpening')
          .where('uid', '==', uid)
          .onSnapshot((querySnapshot) => {
            const posts: TeamUpPost[] = [];
            querySnapshot.forEach((doc) => {
              posts.push({ ...(doc.data() as TeamUpPost), docId: doc.id });
            });
            setPosts(posts);
          });
      } catch (err) {
        console.log(err);
      }
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
        <div className="flex mx-auto justify-between px-2 md:w-2/3">
          <TextButton name="Go back" type="normal" onClick={router.back} />
          <FixedButton
            name="Ask For Teammates"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        {posts.length > 0 ? (
          <div className="mt-8">
            {posts.map((post) => (
              <div key={post.docId}>
                <TeamUpItem data={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <span className="font-sans font-semibold text-gray-300 text-lg md:text-xl">
              You have not asked for teamup yet
            </span>
          </div>
        )}
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <CreatePostForm closeModal={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
