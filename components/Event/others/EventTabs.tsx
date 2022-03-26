import { useRouter } from 'next/router';
import Link from 'next/link';

const EventTabs = () => {
  const router = useRouter();

  const Tab = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} passHref>
      <span
        className={
          'cursor-pointer w-1/2 text-center py-1 px-4 sm:px-12 md:px-20 rounded ' +
          (router.pathname === href ? ' bg-slate-700' : 'hover:bg-slate-900')
        }
      >
        {label}
      </span>
    </Link>
  );

  return (
    <div
      className="w-11/12 md:w-2/3 xl:w-1/2 my-2 md:my-3 mx-auto bg-gray-900/90 rounded-md gap-0.5
    text-gray-300 font-bold font-sans text-sm sm:text-lg flex items-center justify-evenly"
    >
      <Tab label="Upcoming" href="/events" />
      <Tab label="Past" href="/past" />
    </div>
  );
};

export default EventTabs;
