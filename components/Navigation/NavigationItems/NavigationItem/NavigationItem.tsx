import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  children: JSX.Element;
  href: string;
  toolTip?: string;
  isActive?: boolean;
};

export default function NavigationItem({
  children,
  href,
  isActive,
  toolTip,
}: Props) {
  const router = useRouter();
  return (
    <li
      className={
        'font-semibold ' + (isActive ? 'border-b-4 border-indigo-600' : '')
      }
    >
      <Link href={href} passHref>
        <div
          className={
            'relative sm:max-w-xl sm:mx-auto group cursor-pointer inline-block ' +
            'pt-1.5 pb-2 px-5 flex flex-col justify-center text-center ' +
            (isActive
              ? ''
              : 'hover:bg-gray-900 rounded-t-lg transition duration-300')
          }
        >
          <a href={href}>{children}</a>
          {toolTip && (
            <span className="opacity-0 w-24 font-sans text-gray-900 bg-gray-300 text-grey-900 text-center text-xs rounded-md py-2 absolute z-10 group-hover:opacity-100 top-14 -left-1.5 px-1.5 pointer-events-none">
              {toolTip}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}
