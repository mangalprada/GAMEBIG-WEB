import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import '../public/npprogress.css';
import Layout from '../hoc/Layout/Layout';
import { AuthProvider } from '../context/authContext';
import { UIProvider } from '@/context/uiContext';
import { NotificationProvider } from '@/context/notificationContext';
import { MessagesProvider } from '@/context/messageContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
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
    <UIProvider>
      <AuthProvider>
        <NotificationProvider>
          <MessagesProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MessagesProvider>
        </NotificationProvider>
      </AuthProvider>
    </UIProvider>
  );
}

export default MyApp;
