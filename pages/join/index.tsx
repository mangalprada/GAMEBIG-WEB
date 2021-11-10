import Head from 'next/head';
export default function Home() {
  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>Join</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="flex justify-between rounded-lg bg-gray-900 md:w-2/3 xl:w-1/2 mx-auto mt-4 mb-5 px-8 py-2">
          <span className="text-lg text-gray-300">My Posts</span>
          <span className=" text-lg text-gray-300">Team Up +</span>
        </div>
      </div>
    </div>
  );
}
