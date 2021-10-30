import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_SEARCH_ONLY_API_KEY as string
);

export default algoliaClient;
