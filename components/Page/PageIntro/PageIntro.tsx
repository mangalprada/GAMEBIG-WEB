import { useRouter } from 'next/router';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import { useAuth } from '@/context/authContext';
import PageFAQ from './PageFAQ';

export default function PageIntro() {
  const router = useRouter();
  const { userData } = useAuth();

  const createPageHandler = () => {
    if (userData.uid === undefined || userData.uid === '') {
      router.push('/');
    } else {
      router.push('/page/create');
    }
  };

  return (
    <div
      className={
        'my-10 mx-auto p-10 w-11/12 sm:w-4/5 lg:w-3/5 h-5/6 rounded-lg ' +
        'bg-gradient-to-br from-gray-900 to-black ' +
        'font-sans font-semibold'
      }
    >
      <section className="text-center">
        <span className="text-2xl md:text-4xl py-6 text-indigo-600">
          Create a Page for your Esports Organization
        </span>
      </section>

      <section className="w-11/12 mx-auto mt-20">
        <ResponsiveButton name="Create Now!" onClick={createPageHandler} />
      </section>

      <section className="mt-24">
        <h3
          className={
            'flex justify-start w-11/12 mx-auto mb-5 ' +
            'text-2xl font-medium text-gray-400'
          }
        >
          FAQ
        </h3>
        <PageFAQ />
      </section>
    </div>
  );
}
