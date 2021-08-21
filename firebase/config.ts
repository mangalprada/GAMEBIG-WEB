import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBUuGX7ijAKLpAVvPEQb9lr_bmGEJuOJeo',
  authDomain: 'dlord-dev.firebaseapp.com',
  projectId: 'dlord-dev',
  storageBucket: 'dlord-dev.appspot.com',
  messagingSenderId: '634466289053',
  appId: '1:634466289053:web:4ad89f9d81a26cdd311b74',
  measurementId: 'G-JVNZ8B2MJ6',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  // firebase.analytics();
} else {
  firebase.app();
}

export default firebase;
export const db = firebase.firestore();
