import { useEffect, useState } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';
import firebase from '../../../firebase/config';
import { User } from '../../../utilities/types';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  const user = firebase.auth().currentUser || null;
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem href="/organization">Organizations</NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      {user ? (
        <NavigationItem href={`/profile/${user.uid}`}>Profile</NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign In</NavigationItem>
      )}
    </ul>
  );
}
