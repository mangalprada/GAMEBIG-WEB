/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import ResponsiveButton from '../../UI/Buttons/ResponsiveButton';

export default function NoOrganization() {
  return (
    <div
      className={
        'm-10 p-10 w-ful h-5/6 rounded-lg bg-gradient-to-tl font-sans font-semibold ' +
        'from-gray-900 to-black text-center text-indigo-600'
      }
    >
      <span className="text-xl md:text-4xl py-6">
        Create an Organization and Host Matches and Events
      </span>
      <div className="py-8 text-ceter text-sm md:text-lg text-gray-300">
        <span className="text-center font-sans font-semibold">For</span>
        <ul>
          <li>
            <span>Battle Grounds Mobile India / PUBG Mobile</span>
          </li>
          <li>
            <span>Call of Duty Mobile</span>
          </li>
          <li>
            <span>Garena Free Fire</span>
          </li>
          <li>
            <span>and more upcoming...</span>
          </li>
        </ul>
      </div>
      <div className="bottom-8">
        <Link href="/organization/create" passHref>
          <a href="/organization/create">
            <ResponsiveButton name="Create Now!" />
          </a>
        </Link>
      </div>
    </div>
  );
}
