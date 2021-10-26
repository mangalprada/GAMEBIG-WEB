import Head from 'next/head';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatContainer from '../../components/Contact/ChatContainer';
import TypeContainer from '../../components/Contact/ReplyContainer';
import { db } from '../../firebase/firebaseClient';

const chatCollectionRef = db.collection('feedbacks');
const query = chatCollectionRef.orderBy('createdAt').limit(25);

export default function Home() {
  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="flex flex-col fixed sm:static w-full sm:px-10 px-0">
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Give your Valuable feedback to help improve GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>
        <h1 className="text-xl px-4 pt-4 font-semibold font-sans text-indigo-500 tracking-wide">
          Please ask all your queries here
        </h1>
        <div className="px-4 pt-4 rounded-md min-h-full">
          <ChatContainer chatDatas={messages} />
          <TypeContainer />
        </div>
      </main>
    </div>
  );
}
