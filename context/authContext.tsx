import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import localforage from 'localforage';
import firebase from '../firebase/firebaseClient';
import { UserData } from '../utilities/types';
import { FriendRequest } from '../utilities/friends/friends';
import { getFriendRequests, getUserData, saveUser } from '@/libs/user';

const authContext = createContext({
  userData: {} as UserData,
  updateOrgId: (id: string) => {},
  updateOrgName: (name: string) => {},
  authPageNumber: 1,
  receivedFriendRequests: [] as FriendRequest[],
  updateAuthPageNumber: (pageNumber: number) => {},
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

function useProviderAuth() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [authPageNumber, setAuthPageNumber] = useState<number>(1);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState(
    [] as FriendRequest[]
  );

  const signout = async () => {
    await router.push('/');
    await firebase.auth().signOut();
    setUserData({} as UserData);
    localforage.removeItem('user');
    setAuthPageNumber(1);
  };

  const handleSignIn = async (user: firebase.User) => {
    const token = await user.getIdToken();
    nookies.set(undefined, 'token', token, {});
    const { uid, displayName, photoURL } = user;
    if (uid && displayName && photoURL) {
      const userData = await getUserData(uid);
      if (userData) {
        router.push('/');
        setAuthPageNumber(1);
        setUserData(userData);
        localforage.setItem('user', {
          uid: userData.uid,
          username: userData.uid,
        });
      } else {
        saveUser({ username: uid, uid } as UserData);
        setAuthPageNumber(2);
      }
    }
  };

  const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
    firebase.auth().useDeviceLanguage();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) handleSignIn(user);
      })
      .catch((error) => {
        console.log(error);
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
  const getLocalUser = async () => {
    const user = await localforage.getItem('user');
    if (user) {
      setUserData(user as UserData);
    }
  };
  useEffect(() => {
    getLocalUser();
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.set(undefined, 'token', '', {});
        localforage.removeItem('user');
        return;
      } else {
        const userData: UserData = await getUserData(user.uid);
        setUserData(userData);
        localforage.setItem('user', {
          uid: user.uid,
          username: userData.username,
        });
        const requests = getFriendRequests(userData.username);
        setReceivedFriendRequests(requests);
        const token = await user.getIdToken(true);
        nookies.set(undefined, 'token', token, {});
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateOrgId = (id: string) => {
    setUserData({ ...userData, linkedOrganizationId: id });
  };

  const updateOrgName = (name: string) => {
    setUserData({ ...userData, linkedOrganizationName: name });
  };

  const updateAuthPageNumber = (pageNo: number) => {
    setAuthPageNumber(pageNo);
  };

  return {
    userData,
    updateOrgId,
    updateOrgName,
    authPageNumber,
    updateAuthPageNumber,
    signout,
    signInByFacebook,
    signInByGoogle,
    receivedFriendRequests,
  };
}

type Props = {
  isSignedIn?: boolean;
  userData?: UserData;
  updateOrgId?: () => void;
  updateOrgName?: (name: string) => void;
  children: React.ReactNode;
  authPageNumber?: number;
  updateAuthPageNumber?: (param: number) => void;
  signout?: () => void;
  signInByFacebook?: () => void;
  signInByGoogle?: () => void;
  receivedFriendRequests?: FriendRequest[];
};

export const AuthProvider = ({ children }: Props) => {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
