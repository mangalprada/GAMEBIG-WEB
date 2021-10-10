import React from 'react';

type Props = {
  name: string;
  type: 'normal' | 'success' | 'fail';
};

const TextButton = ({ name, type }: Props) => {
  return (
    <div className="flex my-4 justify-center">
      <span
        className={
          'text-lg font-semibold cursor-pointer ' +
          'my-auto shadow-sm px-4 py-2 rounded-lg ' +
          (type === 'normal'
            ? 'text-indigo-500 bg-gray-100 hover:bg-gray-200'
            : type === 'success'
            ? 'text-green-400 bg-green-50 hover:bg-green-100'
            : 'text-red-400 bg-red-50 hover:bg-red-100')
        }
      >
        {name}
      </span>
    </div>
  );
};

export default TextButton;
