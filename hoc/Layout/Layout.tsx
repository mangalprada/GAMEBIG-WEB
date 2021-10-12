import { useState } from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    if (showSideDrawer === true) {
      setShowSideDrawer(false);
    }
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <div className="bg-black">
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className="sm:w-11/12 lg:w-4/5 justify-center mx-auto">
        {children}
      </main>
      <footer className="bg-black h-8"></footer>
    </div>
  );
}

export default Layout;
