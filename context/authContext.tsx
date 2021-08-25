import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  FC,
} from 'react';
import { useRouter } from 'next/router';
import firebase, { db } from '../firebase/config';
import { UserData } from '../utilities/types';
import { User } from '../utilities/types';

const authContext = createContext({
  user: { uid: '', displayName: '', photoURL: '' } as User,
  signout: (): Promise<void> => {
    return Promise.resolve();
  },
  signInByFacebook: (): Promise<void> => {
    return Promise.resolve();
  },
  signInByGoogle: (): Promise<void> => {
    return Promise.resolve();
  },
});

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
        setUser({} as User);
      });
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          const { uid, displayName, photoURL } = user;
          const isDataPresent = isDataPresentInDb(uid);
          if (uid && displayName && photoURL) {
            isDataPresent === null &&
              createUserData({ uid, displayName, photoURL });
            setUser({ uid, displayName, photoURL });
          }
          router.push('/');
        }
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

  const isDataPresentInDb = (uid: string) => {
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        if (uid && displayName && photoURL) {
          setUser({ uid, displayName, photoURL });
        }
      } else {
        setUser({} as User);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user: User;
  signout: () => void;
  signInByFacebook: () => void;
  signInByGoogle: () => void;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
