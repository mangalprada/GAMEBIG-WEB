import { AppProps } from 'next/app';
import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/authContext';
import Layout from '../hoc/Layout/Layout';
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
