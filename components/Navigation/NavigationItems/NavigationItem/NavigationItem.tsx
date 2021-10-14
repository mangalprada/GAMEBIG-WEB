import Link from 'next/link';
import React from 'react';

type Props = {
  children: JSX.Element | string;
  href: string;
};

export default function NavigationItem({ children, href }: Props) {
  return (
    <li className="py-1 px-4 text-gray-500 font-semibold rounded-lg hover:bg-gray-900 rou transition duration-300">
      <div className="flex flex-col justify-center">
        <div className="relative sm:max-w-xl sm:mx-auto">
          <div className="group cursor-pointer relative inline-block w-28 text-center">
            <Link href={href} passHref>
              <a href={href}>{children}</a>
            </Link>
            <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-14 -left-1/2 ml-14 px-3 pointer-events-none">
              Tooltip center
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
