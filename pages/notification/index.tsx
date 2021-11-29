import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/authContext';
import { useNotication } from '@/context/notificationContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import DoubleTick from '../../components/UI/Icons/Others/DoubleTick';
import { db } from 'firebase/firebaseClient';

export default function Home() {
  const { userData } = useAuth();
  const { notices } = useNotication();
  const router = useRouter();

  const handleClick = (type: string) => {
    switch (type) {
      case 'TEAM':
        router.push(`/profile/${userData.username}/teams`);
        break;
    }
  };

  const markRerad = (id: string) => {
    try {
      db.collection('users')
        .doc(userData.uid)
        .collection('notifications')
        .doc(id)
        .update({ isSeen: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Aux>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Notification About Upcoming events" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-col mx-auto px-1 md:px-0 w-full lg:w-1/2 md:w-2/3">
        {notices.map(function (notice, index) {
          return (
            <div
              className={
                'flex justify-between rounded-sm py-2 px-3 my-0.5 ' +
                (notice.isSeen ? 'bg-gray-900 ' : 'bg-gray-700')
              }
              key={index}
              onClick={() => handleClick(notice.type)}
            >
              <span className="text-lg text-gray-100 font-sans">
                {notice.message}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  markRerad(notice.docId);
                }}
                className="flex items-center cursor-pointer p-1 rounded-md"
              >
                {notice.isSeen ? null : <DoubleTick size={28} />}
              </div>
            </div>
          );
        })}
      </div>
    </Aux>
  );
}
