import { FC } from 'react';
import HeaderLogo from '../UI/Logo/HeaderLogo';
import LandingComponent from '../about/LandingComponent';
import FeaturesComponent from '../about/FeaturesComponent';
import FooterComponent from '../about/FooterComponent';

const AuthComponent: FC = () => {
  return (
    <div className="flex flex-col bg-black fixed w-screen inset-0 z-50 overflow-auto">
      <div
        className={
          'h-auto bg-gradient-to-b from-black via-black to-gray-900 ' +
          'shadow-md shadow-gray-900 flex flex-row justify-between px-4 py-1 z-[1005]'
        }
      >
        <HeaderLogo />
      </div>
      <LandingComponent />
      <FeaturesComponent />
      <FooterComponent />
    </div>
  );
};

export default AuthComponent;
