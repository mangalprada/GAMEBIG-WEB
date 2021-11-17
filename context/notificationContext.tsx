import React, { useEffect, useState, useContext, createContext } from 'react';
import localforage from 'localforage';
import firebase, { db } from '../firebase/firebaseClient';
import { updateFcmToken } from '@/libs/user';

type LocalUser = {
  uid: string;
  username: string;
} | null;

const notificationContext = createContext({ notices: [] });

function useProviderNotification() {
  const [notices, setNotices] = useState<any>([]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service worker registration failed, error:', err);
        });
    }
  }, []);

  useEffect(() => {
    try {
      const messaging = firebase.messaging();
      const getToken = async () =>
        await messaging
          .getToken({
            vapidKey: process.env.FIREBASE_MESSAGING_VAPID_KEY,
          })
          .then(async (token) => {
            const currentToken = await localforage.getItem('fcmToken');
            const user: LocalUser = await localforage.getItem('user');
            if (token !== currentToken) {
              localforage.setItem('fcmToken', token);
              if (user) updateFcmToken(user.uid, token);
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
      getToken();
      navigator.serviceWorker.addEventListener('message', (message) => {
        const data = message.data['firebase-messaging-msg-data'];
        if (data) {
          let notices = [];
          let stringifiedNotices = localStorage.getItem('notices');
          if (stringifiedNotices) {
            notices = JSON.parse(stringifiedNotices);
          }
          notices.unshift(data);
          localStorage.setItem('notices', JSON.stringify(notices));
        }
      });
    } catch (err) {
      console.log('error', err);
    }
  }, []);
  return { notices };
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
