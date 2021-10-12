import Link from 'next/link';

type Props = {
  children: JSX.Element | string;
  href: string;
};

export default function NavigationItem({ children, href }: Props) {
  return (
    <li className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-600 transition duration-300">
      <Link href={href}>{children}</Link>
    </li>
  );
}
