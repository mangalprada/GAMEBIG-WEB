import HeaderLogo from '../../UI/Logo/HeaderLogo';
import PrimaryNavigationItems from '../NavigationItems/PrimaryNavigationItems';
import SecondaryNavigationItems from '../NavigationItems/SecondaryNavigationItems';

function MainNavigation() {
  return (
    <header>
      <nav className="shadow-2xl h-auto">
        <div className="mx-6">
          <div className="flex justify-between">
            <HeaderLogo />
            <PrimaryNavigationItems />
            <SecondaryNavigationItems />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
