/* eslint-disable @next/next/no-html-link-for-pages */
import { FC } from 'react';
import Link from 'next/link';

const HeaderLogo: FC = () => {
  return (
    <Link href="/" passHref>
      <a href="/">
        <div className="md:mt-5 mt-3">
          <span
            className="md:text-4xl md:font-bold text-2xl font-semibold bg-clip-text text-transparent tracking-wide 
      bg-gradient-to-tr from-green-500 via-indigo-600 to-red-500 font-sans"
          >
            GAMEBIG
          </span>
          <span className="text-gray-400 md:text-sm md:font-semibold text-xs font-medium font-sans tracking-wide ml-1">
            BETA
          </span>
        </div>
      </a>
    </Link>
  );
};

export default HeaderLogo;
