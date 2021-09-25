import NavigationItems from '../NavigationItems/NavigationItems';
import { DrawerToggle } from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';

type Props = {
  drawerToggleClicked: () => void;
};

function MainNavigation({ drawerToggleClicked }: Props) {
  return (
    <header className={classes.header}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.logo}>Gamebig</div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default MainNavigation;
