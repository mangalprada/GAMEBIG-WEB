import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';
import { useAuth } from '../../../context/authContext';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  const { user } = useAuth();
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem href="/organization">Organizations</NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      {user.uid ? (
        <NavigationItem href={`/profile/${user.uid}`}>Profile</NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign&nbsp;In </NavigationItem>
      )}
    </ul>
  );
}
