import Head from 'next/head';
import OrganizationIntro from '../../components/Organization/OrganizationsIntro/OrganizationIntro';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function Home() {
  return (
    <Aux>
      <Head>
        <title>Organizations</title>
        <meta
          name="description"
          content="Create an Organization and Start host custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <OrganizationIntro />
    </Aux>
  );
}
