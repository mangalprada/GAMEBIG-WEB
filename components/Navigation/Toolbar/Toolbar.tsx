import HeaderLogo from '../../UI/Logo/HeaderLogo';
import PrimaryNavigationItems from '../NavigationItems/PrimaryNavigationItems';
import SecondaryNavigationItems from '../NavigationItems/SecondaryNavigationItems';

function MainNavigation() {
  return (
    <header>
      <nav className="shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-10">
              <div className="flex left-1">
                <HeaderLogo />
              </div>
              <PrimaryNavigationItems />
            </div>
            <SecondaryNavigationItems />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
