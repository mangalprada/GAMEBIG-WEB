import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';
import { useAuth } from '../../../context/authContext';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  const { user, linkedOrgId } = useAuth();
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem
        href={
          linkedOrgId
            ? `/organization/${linkedOrgId}/tournaments`
            : `/organization`
        }
      >
        Organizations
      </NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      {user.username ? (
        <NavigationItem href={`/profile/${user.username}`}>
          Profile
        </NavigationItem>
      ) : (
        <NavigationItem href="/auth">Sign&nbsp;In </NavigationItem>
      )}
    </ul>
  );
}
