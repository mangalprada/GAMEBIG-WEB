import PageNotFound from '@/components/UI/404/PageNotFound';

export default function Custom404() {
  return (
    <div className="w-full flex flex-col items-center md:my-40 my-20">
      <PageNotFound height={200} width={200} />
      <span className="text-2xl md:text-6xl text-center text-gray-400 font-bold">
        Page Not Found
      </span>
    </div>
  );
}
