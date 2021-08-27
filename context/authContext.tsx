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
  isAuthBackdropOpen: false,
  setIsAuthBackdropOpen: (param: boolean) => {},
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
  const [isAuthBackdropOpen, setIsAuthBackdropOpen] = useState(false);

  const signout = async () => {
    await firebase.auth().signOut();
    router.push('/');
    setUser({} as User);
  };

  // handles the complete auth flow
  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async ({ user }) => {
        if (user) {
          const { uid, displayName, photoURL } = user;
          const userExists = await checkUserExistence(uid);
          if (userExists && displayName && photoURL) {
            setUser({ uid, displayName, photoURL });
            router.push('/');
          } else {
            setIsAuthBackdropOpen(true);
          }
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

  const checkUserExistence = (uid: string) => {
    var docRef = db.collection('users').doc(uid);
    let returnValue = false;
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          returnValue = true;
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
    return returnValue;
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
    isAuthBackdropOpen,
    setIsAuthBackdropOpen,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user: User;
  isAuthBackdropOpen: boolean;
  setIsAuthBackdropOpen: (param: boolean) => void;
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
