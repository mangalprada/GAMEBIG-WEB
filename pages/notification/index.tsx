import Head from 'next/head';
import { useNotication } from '@/context/notificationContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import IDPassNotification from '@/components/Notification/IDPassNotification';
import FollowerNotification from '@/components/Notification/FollowerNotification';
import JoinRequestNotification from '@/components/Notification/JoinRequestNotification';
import OrganizerText from '@/components/Notification/OrganizerTextNotification';

export default function Home() {
  const { notices } = useNotication();

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
            <div key={notice.docId}>
              {
                {
                  ID_PASSWORD: <IDPassNotification notification={notice} />,
                  JOIN_REQUEST: <JoinRequestNotification />,
                  NEW_FOLLOWER: <FollowerNotification />,
                  ORGANIZER_TEXT: <OrganizerText />,
                }[notice.type]
              }
            </div>
          );
        })}
      </div>
    </Aux>
  );
}
