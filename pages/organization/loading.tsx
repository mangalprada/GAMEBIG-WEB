import router from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function CreatingPage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/organization/1');
    }, 5000);
  }, []);

  return (
    <Aux>
      <Head>
        <title>Loading...</title>
        <meta name="description" content="Create Organization" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>We are creating your page</div>
    </Aux>
  );
}
