import Link from 'next/link';
import React from 'react';

type Props = {
  children: JSX.Element | string;
  href: string;
  toolTip?: string;
};

export default function NavigationItem({ children, href, toolTip }: Props) {
  return (
    <li className="py-1 px-4 font-semibold rounded-lg hover:bg-gray-900 rou transition duration-300">
      <div className="flex flex-col justify-center">
        <div className="relative sm:max-w-xl sm:mx-auto">
          <div className="group cursor-pointer relative inline-block text-center">
            <Link href={href} passHref>
              <a href={href}>{children}</a>
            </Link>
            <div className="opacity-0 w-24 bg-gray-900 text-gray-300 text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-14 -left-7 px-2 pointer-events-none">
              {toolTip}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
