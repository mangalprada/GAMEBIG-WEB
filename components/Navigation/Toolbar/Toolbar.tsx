import HeaderLogo from '../../UI/Logo/HeaderLogo';
import PrimaryNavigationItems from '../NavigationItems/PrimaryNavigationItems';
import SecondaryNavigationItems from '../NavigationItems/SecondaryNavigationItems';

function MainNavigation() {
  return (
    <header>
      <nav className="h-auto bg-gradient-to-b from-transparent via-transparent to-gray-900">
        <div className="md:mx-6 mx-4">
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
