import HeaderLogo from '../../UI/Logo/HeaderLogo';
import NavigationItems from '../NavigationItems/NavigationItems';
import { DrawerToggle } from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.scss';

type Props = {
  drawerToggleClicked: () => void;
};

function MainNavigation({ drawerToggleClicked }: Props) {
  return (
    <header className="flex flex-row justify-between bg-black h-20 align-middle px-10">
      <DrawerToggle clicked={drawerToggleClicked} />
      <HeaderLogo />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default MainNavigation;
