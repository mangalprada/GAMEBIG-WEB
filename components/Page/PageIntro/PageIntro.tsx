import { useRouter } from 'next/router';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import { useAuth } from '@/context/authContext';

export default function PageIntro() {
  const router = useRouter();
  const { userData } = useAuth();

  const createPageHandler = () => {
    if (userData.uid === undefined || userData.uid === '') {
      router.push('/auth');
    } else {
      router.push('/page/create');
    }
  };

  return (
    <div
      className={
        'my-10 mx-auto p-10 lg:w-2/3 h-5/6 rounded-lg bg-gradient-to-tl font-sans font-semibold ' +
        'from-gray-900 to-black text-center text-indigo-600'
      }
    >
      <span className="text-xl md:text-4xl py-6">
        Create a Page to host events or give updates about your clan
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
        <ResponsiveButton name="Create Now!" onClick={createPageHandler} />
      </div>
    </div>
  );
}
