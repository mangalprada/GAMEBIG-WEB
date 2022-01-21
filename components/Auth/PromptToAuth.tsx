import { useRouter } from 'next/router';
import React from 'react';

const PromptToAuth = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <div className="mx-auto mt-16 w-11/12 md:w-1/2">
      <button
        className={
          'w-full rounded-md px-8 py-2 text-xl text-gray-300 font-semibold ' +
          'bg-gray-800/80 hover:bg-slate-900 active:bg-slate-900/50'
        }
        type="button"
        onClick={() => router.push('/')}
      >
        {message}
      </button>
    </div>
  );
};

export default PromptToAuth;
