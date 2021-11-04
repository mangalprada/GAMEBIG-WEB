import Head from 'next/head';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageContainer from '../../components/Messages/MessageContainer';
import TypeContainer from '../../components/Messages/MessageInput';
import Facebook from '../../components/UI/Icons/SocialIcons/FacebookIcon';
import Instagram from '../../components/UI/Icons/SocialIcons/InstagramIcon';
import Twitter from '../../components/UI/Icons/SocialIcons/TwitterIcon';
import { db } from '../../firebase/firebaseClient';

const chatCollectionRef = db.collection('feedback');
const query = chatCollectionRef.orderBy('createdAt').limit(25);

export default function Home() {
  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Give your Valuable feedback to help improve GameBig"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <div className="px-4 mt-6 flex justify-start items-center gap-4 text-2xl font-sans font-semibold text-gray-300">
          Contact Us On:
          <a href="https://www.facebook.com/GameBig-101011608993281/">
            <Facebook size={40} />
          </a>
          <a href="https://www.instagram.com/gamebighq/">
            <Instagram size={38} />
          </a>
          <a href="https://twitter.com/GameBigHQ">
            <Twitter size={32} />
          </a>
        </div>
        <h1 className="text-xl px-4 pt-4 font-semibold font-sans text-indigo-500 tracking-wide">
          Or give us your feedback here
        </h1>
        {/* <div className="px-4 rounded-md min-h-full">
          <ChatContainer chatDatas={messages} />
          <TypeContainer />
        </div> */}
      </div>
    </div>
  );
}
