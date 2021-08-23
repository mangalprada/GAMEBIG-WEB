import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';
import { useRouter } from 'next/router';
import firebase, { db } from '../firebase/config';
import { User, UserData } from '../utilities/types';

const authContext = createContext(null);

function useProvideAuth() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);

  const signin = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // setUser(response.user);
        router.push('/');
        return response.user;
      });
  };

  const signup = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // setUser(response.user);
        router.push('/');
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
        setUserData(null);
      });
  };

  const sendPasswordResetEmail = (email: string) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (password: string, code: string) => {
    const resetCode = code;

    return firebase
      .auth()
      .confirmPasswordReset(resetCode, password)
      .then(() => {
        return true;
      });
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const { uid, email, displayName, photoURL } = user;
        const currentUserData = getUserData(uid);

        if (currentUserData) {
          setUserData(currentUserData);
        } else {
          createUserData({ uid, email, displayName, photoURL });
          setUserData({ uid, email, displayName, photoURL });
        }
        router.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };

  const signInByGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return signInWithProvider(provider);
  };

  const signInByFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return signInWithProvider(provider);
  };

  const getUserData = (uid: string) => {
    var docRef = db.collection('users').doc(uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  const createUserData = async (userData: UserData) => {
    try {
      await db.collection('users').doc(userData.uid).set(userData);
    } catch (err) {
      console.log('err', err);
    }
  };

  return {
    userData,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInByFacebook,
    signInByGoogle,
  };
}

export const AuthProvider: FC<{}> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
