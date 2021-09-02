import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  FC,
} from 'react';
import { useRouter } from 'next/router';
import firebase, { db } from '../firebase/config';
import { User, UserData } from '../utilities/types';

const authContext = createContext({
  user: { uid: '', displayName: '', photoURL: '' } as User,
  authPageNumber: 1,
  createUser: (userData: UserData) => {},
  setAuthPageNumber: (pageNumber: number) => {},
  isUserIdTaken: (userId: string): Promise<null> => {
    return Promise.resolve(null);
  },
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
  const [authPageNumber, setAuthPageNumber] = useState<number>(1);

  const signout = async () => {
    await firebase.auth().signOut();
    router.push('/');
    setUser({} as User);
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async ({ user }) => {
        if (user) {
          const { uid, displayName, photoURL } = user;
          if (uid && displayName && photoURL) {
            setUser({ uid, displayName, photoURL });
          }

          const isUser = await checkUserExistence(uid);
          console.log(isUser, 'isuser');
          if (isUser) {
            router.push('/');
            setAuthPageNumber(1);
          } else {
            setAuthPageNumber(2);
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

  const isUserIdTaken = async (userId: string) => {
    let returnValue = null;
    await db
      .collection('users')
      .where('userId', '==', userId)
      .where('uid', '!=', user.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          returnValue = true;
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return returnValue;
  };

  const createUser = async (userData: UserData | UserData) => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .set({ ...userData, uid: user.uid, photoURL: user.photoURL });
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
    authPageNumber,
    createUser,
    isUserIdTaken,
    setAuthPageNumber,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user: User;
  authPageNumber: number;
  createUser: (userData: UserData) => void;
  isUserIdTaken: (userId: string) => void;
  setAuthPageNumber: (param: number) => void;
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
