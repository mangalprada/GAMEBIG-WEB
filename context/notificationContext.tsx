import React, { useEffect, useState, createContext, useContext } from 'react';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { db } from '../firebase/firebaseClient';
import { useAuth } from './authContext';
import { NotificationType } from '@/utilities/notification/type';

const notificationContext = createContext({
  notices: [] as NotificationType[],
  unseen: 0,
});

function useProviderNotification() {
  const { userData } = useAuth();
  const [notices, setNotices] = useState<NotificationType[]>([]);
  const [unseen, setUnseen] = useState<number>(0);

  useEffect(() => {
    const fetchNotices = () => {
      try {
        db.collection('users')
          .doc(userData.uid)
          .collection('notifications')
          .orderBy('createdAt', 'desc')
          .onSnapshot((snapshots) => {
            const tempNotices: NotificationType[] = [];
            let tempUnseen = 0;
            snapshots.forEach((doc) => {
              const notice = doc.data() as NotificationType;
              const { isSeen } = notice;
              if (!isSeen) {
                tempUnseen += 1;
              }
              tempNotices.push({ ...notice, docId: doc.id });
            });
            setNotices(tempNotices);
            setUnseen(tempUnseen);
          });
      } catch (err) {
        console.log(err);
      }
    };
    if (userData.uid) fetchNotices();
  }, [userData.uid]);

  useEffect(() => {
    try {
      if (!process || !process.env.PUSHER_BEAM_INSTANCE_ID) {
        return;
      }
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.PUSHER_BEAM_INSTANCE_ID,
      });

      // Check if the Beams user matches the user that is currently logged in
      beamsClient
        .getUserId()
        .then((userId) => {
          if (userData.uid && userId && userId !== userData.uid) {
            // Unregister for notifications
            return beamsClient.stop();
          }
          return;
        })
        .catch(console.error);

      const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
        url: `${process.env.BASE_URL}/api/beamsToken`,
      });
      // Associating the device with the user when they log in and enable notifications
      if (userData.uid)
        beamsClient
          .start()
          .then(() => beamsClient.setUserId(userData.uid, beamsTokenProvider))
          .then(() => console.log('Successfully registered and subscribed!'))
          .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }, [userData.uid]);
  return { notices, unseen };
}

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const provider = useProviderNotification();
  return (
    <notificationContext.Provider value={provider}>
      {children}
    </notificationContext.Provider>
  );
};

export const useNotication = () => {
  return useContext(notificationContext);
};
