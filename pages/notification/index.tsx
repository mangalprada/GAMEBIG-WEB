import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/context/authContext';
import { useNotication } from '@/context/notificationContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import DoubleTick from '../../components/UI/Icons/Others/DoubleTick';
import { db } from 'firebase/firebaseClient';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '@/utilities/functions/dateConvert';
import { useUI } from '@/context/uiContext';

export default function Home() {
  const { openSnackBar } = useUI();
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

  if (notices.length === 0)
    return (
      <div className="flex justify-center mt-4 md:mt-10">
        <span className="font-semibold text-xl md:text-3xl text-gray-500">
          No Notification !!
        </span>
      </div>
    );

  return (
    <Aux>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Notification About Upcoming events" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-col mx-auto px-2 my-1 md:px-0 w-full lg:w-1/2 md:w-2/3">
        {notices.map(function (notice, index) {
          return (
            <div
              className={
                ' rounded-sm py-2 px-3 bg-slate-900 ' +
                (notice.isSeen ? ' my-0.5 ' : 'ring ring-gray-600 my-1 ')
              }
              key={index}
              onClick={() => handleClick(notice.type)}
            >
              <span className="text-lg text-gray-300 font-sans">
                {notice.data.pageName} - {notice.data.eventType}
                {' starting at '}
                {`${getDecoratedTime(
                  notice.data.startTime
                )}, ${getDecoratedDate(notice.data.startTime)}`}
              </span>
              <div className=" flex justify-evenly my-1 rounded-md">
                <section>
                  <h2 className="font-semibold text-gray-500">Room Id</h2>
                  <span
                    className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
                    onMouseDown={() => {
                      if (notice.data.roomId) {
                        navigator.clipboard.writeText(notice.data.roomId);
                        openSnackBar({
                          label: 'Copied!',
                          message: 'Room ID copied to clipboard',
                          type: 'success',
                        });
                      }
                    }}
                  >
                    {notice.data.roomId}
                  </span>
                </section>
                <section>
                  <h2 className="font-semibold text-gray-500">Password</h2>
                  <span
                    className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
                    onMouseDown={() => {
                      if (notice.data.roomId) {
                        navigator.clipboard.writeText(notice.data.roomId);
                        openSnackBar({
                          label: 'Copied!',
                          message: 'Password copied to clipboard',
                          type: 'success',
                        });
                      }
                    }}
                  >
                    {notice.data.password}
                  </span>
                </section>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  markRerad(notice.docId);
                }}
                className="flex justify-end cursor-pointer p-1 rounded-md"
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
