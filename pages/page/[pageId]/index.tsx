import Head from 'next/head';
import useSWR from 'swr';
import PageHeader from '../../../components/Page/PageHeader/PageHeader';
import AboutPage from '../../../components/Page/AboutPage/AboutPage';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { fetchPageData } from '../../../libs/fetchPageData';
import { useRouter } from 'next/router';

export default function PageAdmin() {
  const router = useRouter();
  const { pageId } = router.query;
  const { data: pageData } = useSWR(pageId, fetchPageData);
  return (
    <Aux>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {pageData ? (
        <>
          <PageHeader data={pageData} />
          <AboutPage data={pageData} />
        </>
      ) : (
        <div></div>
      )}
    </Aux>
  );
}
