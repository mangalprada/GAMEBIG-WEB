import Link from 'next/link';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';

type Props = {
  clicked?: () => void;
};

export default function NavigationItems({ clicked }: Props) {
  return (
    <ul className={styles.NavigationItems} onClick={clicked}>
      <NavigationItem href="/">Tournaments</NavigationItem>
      <NavigationItem href="/organizations">Organizations</NavigationItem>
      <NavigationItem href="/about">About</NavigationItem>
      <NavigationItem href="/profile">Profile</NavigationItem>
    </ul>
  );
}
