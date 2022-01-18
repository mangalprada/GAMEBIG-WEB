import Aux from '../../../hoc/Auxiliary/Auxiliary';
import PageForm from '../../../components/Page/CreatePage/PageForm';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const { BASE_URL } = process.env;

async function getPageData(arg: string) {
  const response = await axios.get(arg);
  return response.data.pageData;
}

export default function PageAdmin() {
  const router = useRouter();
  const { pageId } = router.query;
  const { data: pageData } = useSWR(
    `${BASE_URL}/api/page/?pageId=${pageId}`,
    getPageData
  );

  if (!pageData) return null;

  return (
    <Aux>
      <PageForm pageData={pageData} />
    </Aux>
  );
}
