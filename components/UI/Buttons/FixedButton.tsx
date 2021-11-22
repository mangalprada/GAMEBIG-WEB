import { FC } from 'react';
import { ButtonProps } from './types';

const FixedButton: FC<ButtonProps> = ({
  name,
  type,
  onClick,
  isDisabled,
  isDangerous,
}: ButtonProps) => {
  return (
    <div className="my-4">
      <button
        className={
          'text-white font-medium tracking-wide text-base md:text-lg py-1 md:py-2 px-2 md:px-4 rounded-md md:rounded-lg ' +
          (isDisabled
            ? 'bg-gray-500 opacity-50 cursor-not-allowed'
            : 'transition duration-300 ease-in-out shadow-lg hover:shadow-xl ' +
              'active:opacity-40 ' +
              (isDangerous
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-indigo-600 hover:bg-indigo-700'))
        }
        type={type}
        onClick={onClick}
        disabled={isDisabled}
      >
        {name}
      </button>
    </div>
  );
};

export default FixedButton;
