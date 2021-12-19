import { NextPage } from 'next';
import Head from 'next/head';

import HeaderLogo from '@/components/UI/Logo/HeaderLogo';
import LandingComponent from '@/components/about/LandingComponent';
import FeaturesComponent from '@/components/about/FeaturesComponent';
import FooterComponent from '@/components/about/FooterComponent';

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col bg-black fixed w-screen inset-0 z-50 overflow-auto">
      <Head>
        <title>Gamebig</title>
        <meta
          name="description"
          content={
            'Gamebig is a platform for gamers to share their gaming experiences ' +
            'and connect with other gamers.'
          }
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Welcome to GameBig" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Join GameBig to connect and play with awsome gamers, just like you!"
        />
        <meta property="og-url" content="https://www.gamebig.in" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div
        className={
          'h-auto bg-gradient-to-b from-black via-black to-gray-900 ' +
          'shadow-md shadow-gray-900 flex flex-row justify-between px-4 py-1 z-[1005]'
        }
      >
        <HeaderLogo />
      </div>
      <LandingComponent />
      <FeaturesComponent />
      <FooterComponent />
    </div>
  );
};

export default AboutPage;
