import * as firebaseAdmin from 'firebase-admin';

let { FIREBASE_PRIVATE_KEY } = process.env;
if (FIREBASE_PRIVATE_KEY)
  FIREBASE_PRIVATE_KEY = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}
export { firebaseAdmin };
