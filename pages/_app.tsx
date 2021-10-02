import { AppProps } from 'next/app';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../styles/globals.scss';
import { AuthProvider } from '../context/authContext';
import Layout from '../hoc/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiPickersUtilsProvider>
    </AuthProvider>
  );
}

export default MyApp;
