import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import firebase, { db } from '../firebase/config';
import { User, UserData } from '../utilities/types';
import getUser from '../lib/getUser';

const authContext = createContext({
  user: { uid: '', username: '', photoURL: '', linkedOrgId: null } as User,
  isSignedIn: false,
  userData: {} as UserData,
  linkedOrgId: null as string | null,
  updateOrgId: (id: string) => {},
  authPageNumber: 1,
  updateDisplayName: (displayName: string): Promise<void> => {
    return Promise.resolve();
  },
  createUser: (userData: UserData): Promise<void> => {
    return Promise.resolve();
  },
  updateAuthPageNumber: (pageNumber: number) => {},
  isUsernameTaken: (username: string): Promise<boolean> => {
    return Promise.resolve(false);
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [linkedOrgId, setLinkedOrgId] = useState<string | null>(null);
  const [authPageNumber, setAuthPageNumber] = useState<number>(1);

  const signout = async () => {
    await firebase.auth().signOut();
    router.push('/');
    setIsSignedIn(false);
    setUser({} as User);
    setLinkedOrgId(null);
    setAuthPageNumber(1);
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async ({ user }) => {
        if (user) {
          setIsSignedIn(true);
          const { uid, displayName, photoURL } = user;
          if (uid && displayName && photoURL) {
            const isUser = await getUser(displayName);
            const username = isUser ? displayName : displayName.split(' ')[0];
            if (isUser) {
              router.push('/');
              setAuthPageNumber(1);
            } else {
              setAuthPageNumber(2);
            }
            setUser({ uid, username, photoURL });
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

  const isUsernameTaken = async (username: string) =>
    await db
      .collection('users')
      .where('username', '==', username)
      .where('username', '!=', user.username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        return false;
      });

  const updateDisplayName = async (displayName: string) => {
    const user = firebase.auth().currentUser;
    if (user)
      user
        .updateProfile({
          displayName,
        })
        .then(() => {
          console.log('User display name updated successfully');
        })
        .catch((error) => {
          console.log('User display name update failed');
        });
  };

  const createUser = async (userData: UserData | UserData) => {
    try {
      await db
        .collection('users')
        .add({ ...userData, uid: user.uid, photoURL: user.photoURL });
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    const getAndSetUserData = async (username: string) => {
      const data = await getUser(username);
      if (data) {
        setUserData(data);
        const { linkedOrganizationId } = data;
        setLinkedOrgId(linkedOrganizationId);
      }
    };
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
        const { uid, displayName, photoURL } = user;
        if (uid && displayName && photoURL) {
          const username = displayName;
          setUser({ uid, username, photoURL });
          getAndSetUserData(username);
        }
      } else {
        setIsSignedIn(false);
        setUser({} as User);
        setAuthPageNumber(1);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateOrgId = (id: string) => {
    setLinkedOrgId(id);
  };

  const updateAuthPageNumber = (pageNo: number) => {
    setAuthPageNumber(pageNo);
  };

  return {
    user,
    isSignedIn,
    userData,
    linkedOrgId,
    updateOrgId,
    authPageNumber,
    updateDisplayName,
    createUser,
    isUsernameTaken,
    updateAuthPageNumber,
    signout,
    signInByFacebook,
    signInByGoogle,
  };
}

type Props = {
  user?: User;
  isSignedIn?: boolean;
  userData?: UserData;
  linkedOrgId?: null | string;
  updateOrgId?: () => void;
  children: React.ReactNode;
  authPageNumber?: number;
  updateDisplayName?: (displayName: string) => void;
  createUser?: (userData: UserData) => void;
  isUsernameTaken?: (username: string) => boolean;
  updateAuthPageNumber?: (param: number) => void;
  signout?: () => void;
  signInByFacebook?: () => void;
  signInByGoogle?: () => void;
};

export const AuthProvider = ({ children }: Props) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
