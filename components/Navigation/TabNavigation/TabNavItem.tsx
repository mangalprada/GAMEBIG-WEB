import Link from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
  isActive: boolean;
}

const TabNavItem: FC<Props> = ({ href, label, isActive }: Props) => {
  return (
    <Link href={href} passHref>
      <li
        className={
          'py-4 px-10 block rounded-t-lg ' +
          'cursor-pointer hover:bg-gray-900 ' +
          'font-semibold text-lg font-sans tracking-wider ' +
          (isActive
            ? 'border-b-4 border-indigo-600 text-gray-300'
            : 'text-gray-500')
        }
      >
        {label}
      </li>
    </Link>
  );
};

export default TabNavItem;
