import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../styles/globals.scss';
import { AuthProvider } from '../context/authContext';
import Layout from '../hoc/Layout/Layout';
import firebase from '../firebase/firebaseClient';

function MyApp({ Component, pageProps }: AppProps) {
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
    const messaging = firebase.messaging();
    const getToken = async () =>
      await messaging
        .getToken({
          vapidKey: process.env.FIREBASE_MESSAGING_VAPID_KEY,
        })
        .then((token) => {
          console.log('token fetched successfully');
        })
        .catch((err) => {
          console.log('error', err);
        });
    getToken();
    messaging.onMessage((payload) =>
      console.log('Message received. ', payload)
    );
    navigator.serviceWorker.addEventListener('message', (message) =>
      console.log(message)
    );
  }, []);

  return (
    <AuthProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiPickersUtilsProvider>
    </AuthProvider>
  );
}

export default MyApp;
