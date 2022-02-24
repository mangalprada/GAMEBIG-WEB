import { useRouter } from 'next/router';
import DoubleTick from '../../components/UI/Icons/Others/DoubleTick';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '@/utilities/functions/dateConvert';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';
import { db } from 'firebase/firebaseClient';
import { NotificationType } from '@/utilities/notification/type';

function IDPassNotification({
  notification,
}: {
  notification: NotificationType;
}) {
  const { openSnackBar } = useUI();
  const { userData } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/page/${notification.data.pageId}/events/${notification.data.eventId}`
    );
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
  return (
    <div
      className={
        ' rounded-sm py-2 px-3 bg-slate-900 ' +
        (notification.isSeen ? ' my-0.5 ' : 'ring ring-gray-600 my-1 ')
      }
      onMouseDown={handleClick}
    >
      <span className="text-lg text-gray-300 font-sans">
        {notification.data.pageName} - {notification.data.eventType}
        {' starting at '}
        {`${getDecoratedTime(notification.data.startTime)}, ${getDecoratedDate(
          notification.data.startTime
        )}`}
      </span>
      <div className=" flex justify-evenly my-1 rounded-md">
        <section>
          <h2 className="font-semibold text-gray-500">Room Id</h2>
          <span
            className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
            onMouseDown={(event) => {
              event.stopPropagation();
              if (notification.data.roomId) {
                navigator.clipboard.writeText(notification.data.roomId);
                openSnackBar({
                  label: 'Copied!',
                  message: 'Room ID copied to clipboard',
                  type: 'success',
                });
              }
            }}
          >
            {notification.data.roomId}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-gray-500">Password</h2>
          <span
            className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
            onMouseDown={(event) => {
              event.stopPropagation();
              if (notification.data.roomId) {
                navigator.clipboard.writeText(notification.data.roomId);
                openSnackBar({
                  label: 'Copied!',
                  message: 'Password copied to clipboard',
                  type: 'success',
                });
              }
            }}
          >
            {notification.data.password}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-gray-500">Slot</h2>
          <span className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md">
            {notification.data.slotNumber}
          </span>
        </section>
      </div>
      <div
        onMouseDown={(e) => {
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
