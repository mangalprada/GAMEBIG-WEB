import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';
import { useAuth } from '../../../context/authContext';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  const isOrgExists = false;
  const orgId = 1;

  const { user } = useAuth();
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem
        href={
          isOrgExists ? `/organization/${orgId}/tournaments` : `/organization`
        }
      >
        Organizations
      </NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      {user.uid ? (
        <NavigationItem href={`/profile/${user.uid}`}>Profile</NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign&nbsp;In </NavigationItem>
      )}
    </ul>
  );
}
