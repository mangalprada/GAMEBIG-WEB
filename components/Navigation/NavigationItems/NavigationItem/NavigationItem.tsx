import Link from 'next/link';
import classes from './NavigationItem.module.scss';

type Props = {
  children: string;
  href: string;
};

export default function NavigationItem({ children, href }: Props) {
  return (
    <li className={classes.NavigationItem}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
