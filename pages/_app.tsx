import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';
import '../public/npprogress.css';
import { AuthProvider } from '../context/authContext';
import Layout from '../hoc/Layout/Layout';
import ProgressBar from '../components/UI/Progress/ProgressBar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      console.log(`Loading: ${router.pathname}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <AuthProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <ProgressBar /> */}
        <style jsx>{`
          a {
            margin: 0 10px 0 0;
          }
        `}</style>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiPickersUtilsProvider>
    </AuthProvider>
  );
}

export default MyApp;
