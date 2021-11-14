import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import PageHeader from '../../../components/Page/PageHeader/PageHeader';
import AboutPage from '../../../components/Page/AboutPage/AboutPage';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { fetchPageData } from '../../../libs/fetchPageData';
import { PageFormData } from '../../../utilities/page/types';

interface Props {
  pageData: PageFormData | undefined;
}

export default function PageAdmin({ pageData }: Props) {
  const id = 1;

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
        <div>Network Error</div>
      )}
    </Aux>
  );
}

interface IParams extends ParsedUrlQuery {
  pageId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.params as IParams;
  let pageData = undefined;
  pageData = await fetchPageData(pageId);
  return {
    props: {
      pageData,
    },
  };
};
