import { BasicUserType } from '@/utilities/types';
import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_ONLY_API_KEY as string
);

export default algoliaClient;

export const searchUser = async (query: string) => {
  const results: BasicUserType[] = [];
  if (query.trim() === '') return results;
  const index = algoliaClient.initIndex('users');
  await index
    .search(query, {
      attributesToRetrieve: ['username', 'name', 'uid', 'photoURL'],
      hitsPerPage: 5,
    })
    .then(({ hits }) => {
      hits.map((hit: any) => {
        results.push({
          username: hit.username,
          name: hit.name,
          uid: hit.uid,
          photoURL: hit.photoURL,
        });
      });
    });
  return results;
};
