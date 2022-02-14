import React, { useEffect, useState, createContext, useContext } from 'react';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { db } from '../firebase/firebaseClient';
import { useAuth } from './authContext';
import { Notification } from '@/utilities/notification/type';

const notificationContext = createContext({
  notices: [] as Notification[],
  unseen: 0,
});

function useProviderNotification() {
  const { userData } = useAuth();
  const [notices, setNotices] = useState<Notification[]>([]);
  const [unseen, setUnseen] = useState<number>(0);

  const fetchNotices = () => {
    try {
      db.collection('users')
        .doc(userData.uid)
        .collection('notifications')
        .onSnapshot((snapshots) => {
          const tempNotices: Notification[] = [];
          let tempUnseen = 0;
          snapshots.forEach((doc) => {
            const notice = doc.data() as Notification;
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

  useEffect(() => {
    if (userData.uid) fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.uid]);

  useEffect(() => {
    try {
      const { PUSHER_BEAM_INSTANCE_ID } = process.env;
      if (!userData.username || !PUSHER_BEAM_INSTANCE_ID) return;
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: PUSHER_BEAM_INSTANCE_ID,
      });
      beamsClient
        .start()
        .then(() => beamsClient.addDeviceInterest('hello'))
        .then(() => console.log('Successfully registered and subscribed!'))
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  }, [userData.username]);
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
