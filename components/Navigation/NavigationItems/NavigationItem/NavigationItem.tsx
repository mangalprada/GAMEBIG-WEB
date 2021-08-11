import Link from 'next/link';
import styles from './NavigationItem.module.scss';

type Props = {
  children: string;
  href: string;
};

export default function NavigationItem({ children, href }: Props) {
  return (
    <li className={styles.NavigationItem}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
