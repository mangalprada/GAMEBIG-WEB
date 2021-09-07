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
import { getOrganizationId } from '../lib/getOrganizationId';

const authContext = createContext({
  user: { uid: '', displayName: '', photoURL: '', linkedOrgId: null } as User,
  linkedOrgId: null as string | null,
  updateOrgId: (id: string) => {},
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
  const [linkedOrgId, setLinkedOrgId] = useState<string | null>(null);

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
        setLinkedOrgId(null);
        setUser({} as User);
      });
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
          const isDataPresent = await isDataPresentInDb(uid);
          if (uid && displayName && photoURL) {
            if (!isDataPresent) {
              await createUserData({ uid, displayName, photoURL });
            }
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
          setOrgId(uid);
        }
      } else {
        setUser({} as User);
      }
    });

    return () => unsubscribe();
  }, []);

  const setOrgId = async (uid: string) => {
    const linkedId = await getOrganizationId(uid);
    await setLinkedOrgId(linkedId);
  };

  const updateOrgId = (id: string) => {
    setLinkedOrgId(id);
  };

  return {
    user,
    linkedOrgId,
    updateOrgId,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user?: User;
  linkedOrgId?: null | string;
  updateOrgId?: () => void;
  signout?: () => void;
  signInByFacebook?: () => void;
  signInByGoogle?: () => void;
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
