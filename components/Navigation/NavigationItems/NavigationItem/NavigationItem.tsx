import Link from 'next/link';
import React from 'react';

type Props = {
  children: JSX.Element | string;
  href: string;
};

export default function NavigationItem({ children, href }: Props) {
  return (
    <li className="py-1 px-4 text-gray-500 font-semibold rounded-lg hover:bg-gray-900 rou transition duration-300">
      <Link href={href} passHref>
        <a href={href}>{children}</a>
      </Link>
    </li>
  );
}
