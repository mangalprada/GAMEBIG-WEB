import { AppProps } from 'next/app';
import '../styles/globals.scss';
import Layout from '../hoc/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
