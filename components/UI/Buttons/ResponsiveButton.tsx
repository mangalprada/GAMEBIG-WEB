import { FC } from 'react';
import { ButtonProps } from './types';

const ResponsiveButton: FC<ButtonProps> = ({
  name,
  type,
  onClick,
  isDisabled,
  isDangerous,
}: ButtonProps) => {
  return (
    <div className="flex justify-center mt-10">
      <button
        className={
          'text-white font-semibold text-xl py-2 px-4 rounded-md w-full ' +
          (isDisabled
            ? 'bg-gray-500 opacity-50 cursor-not-allowed'
            : 'transition duration-500 ease-in-out ' +
              'transform hover:-translate-y-1 hover:scale-105 ' +
              (isDangerous
                ? 'bg-red-500 hover:bg-red-700'
                : 'bg-indigo-600 hover:bg-green-500'))
        }
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={name}
      >
        {name}
      </button>
    </div>
  );
};

export default ResponsiveButton;
