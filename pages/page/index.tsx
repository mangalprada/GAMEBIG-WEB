import Head from 'next/head';
import PageIntro from '../../components/Page/PageIntro/PageIntro';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function Home() {
  return (
    <Aux>
      <Head>
        <title>Organization</title>
        <meta
          name="description"
          content="Create an Page and Start host custom room matches for BGMI, Call of Duty and Gerena Freefire"
          key={'description'}
        />
        <meta property="og-url" content="https://www.gamebig.in/page" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <PageIntro />
    </Aux>
  );
}
