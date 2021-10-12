import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import BottomNavigationBar from '../../components/Navigation/NavigationItems/BottomNavigationBar';
import Progress from '../../components/UI/Progress/Progress';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="bg-black">
      <Progress />
      <Toolbar />
      <main className="sm:w-11/12 lg:w-4/5 bg-repeat justify-center mx-auto">
        {children}
      </main>
      <BottomNavigationBar />
      <footer className="bg-black h-8"></footer>
    </div>
  );
}

export default Layout;
