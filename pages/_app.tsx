import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { AuthProvider } from '../context/authContext';
import Layout from '../hoc/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
