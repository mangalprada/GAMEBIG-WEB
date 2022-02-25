import { useAuth } from '@/context/authContext';
import { useUI } from '@/context/uiContext';
import { NotificationType } from '@/utilities/notification/type';
import DoubleTick from '../../components/UI/Icons/Others/DoubleTick';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from 'firebase/firebaseClient';
import HorizontalProfile from '../Profile/HorizontalProfile';
import FixedButton from '../UI/Buttons/FixedButton';

function IDPassNotification({
  notification,
}: {
  notification: NotificationType;
}) {
  const { userData } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/openings/${userData.uid}/${notification.data.postId}`);
    if (!notification.isSeen) markRerad(notification.docId);
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

  const sender = {
    uid: notification.data.requestingUid,
    username: notification.data.requestingUsername,
    photoURL: notification.data.requestingPhotoURL,
    name: notification.data.requestingName,
  };
  return (
    <div
      className={
        ' rounded-sm py-2 px-3 bg-slate-900 ' +
        (notification.isSeen ? ' my-0.5 ' : 'ring ring-gray-600 my-1 ')
      }
      onClick={handleClick}
    >
      <span className="text-lg text-gray-300 font-sans">
        {notification.data.requestingName} is interested in joining your team
      </span>
      <div className="flex items-center justify-around my-1 rounded-md bg-gray-800">
        <HorizontalProfile user={sender} isTransparent />
        <FixedButton
          name="Message"
          onClick={() => {
            const stringifiedData: string = JSON.stringify(sender);
            router.push({
              pathname: `/messages`,
              query: { receiver: stringifiedData },
            });
          }}
        />
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          markRerad(notification.docId);
        }}
        className="flex justify-end cursor-pointer p-1 rounded-md"
      >
        {notification.isSeen ? null : (
          <div className="bg-gray-800 px-2 py-0.5 rounded-md flex gap-1 items-center text-gray-400 font-semibold">
            Mark as seen
            <DoubleTick size={28} />
          </div>
        )}
      </div>
    </div>
  );
}

export default IDPassNotification;
