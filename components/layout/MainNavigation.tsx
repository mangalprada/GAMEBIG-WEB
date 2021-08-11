import Link from 'next/link';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>DLord</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Tournaments</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
