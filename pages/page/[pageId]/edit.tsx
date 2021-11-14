import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { fetchPageData } from '../../../libs/fetchPageData';
import { PageFormData } from '../../../utilities/page/types';
import PageForm from '../../../components/Page/CreatePage/PageForm';

interface Props {
  pageData: PageFormData | undefined;
}

export default function PageAdmin({ pageData }: Props) {
  return (
    <Aux>
      <PageForm pageData={pageData} />
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
