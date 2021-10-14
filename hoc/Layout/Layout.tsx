import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import BottomNavigationBar from '../../components/Navigation/NavigationItems/BottomNavigationBar';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="bg-black">
      <Toolbar />
      <main className="sm:w-11/12 lg:w-4/5 justify-center mx-auto">
        {children}
      </main>
      <BottomNavigationBar />
      <footer className="bg-black h-8"></footer>
    </div>
  );
}

export default Layout;
