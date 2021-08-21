import { useEffect, useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';
import firebase from '../../../firebase/config';
import { User } from '../../../utilities/types';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked, uid }) {
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem href="/organization">Organizations</NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      {uid ? (
        <NavigationItem href={`/profile/${uid}`}>Profile</NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign In</NavigationItem>
      )}
    </ul>
  );
}

export async function getStaticProps() {
  const getUser = async () => await firebase.auth().currentUser;
  const currentUser = getUser();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid, 'uid------------------------');
  return {
    props: { uid },
  };
}
