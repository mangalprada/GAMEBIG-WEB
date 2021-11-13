import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import BottomNavigationBar from '../../components/Navigation/NavigationItems/BottomNavigationBar';
import SnackbarAlert from '@/components/UI/Snackbar/SnackBar';
import ShareLinkModal from '@/components/UI/Modal/ShareLinkModal';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="bg-black">
      <Toolbar />
      <div className="sm:w-11/12 lg:w-4/5 justify-center mx-auto">
        {children}
        <SnackbarAlert autoHideDuration={4000} />
        <ShareLinkModal />
      </div>
      <BottomNavigationBar />
      <footer className="bg-black h-8"></footer>
    </div>
  );
}

export default Layout;
