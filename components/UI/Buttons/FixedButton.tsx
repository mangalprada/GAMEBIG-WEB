import { FC } from 'react';
import { ButtonProps } from './types';

const FixedButton: FC<ButtonProps> = ({
  name,
  type,
  onClickHandler,
  isDisabled,
  isDangerous,
}: ButtonProps) => {
  return (
    <button
      className={
        'text-white font-normal tracking-wide text-lg py-2 px-4 rounded-lg ' +
        (isDisabled
          ? 'bg-gray-500 opacity-50 cursor-not-allowed'
          : 'transition duration-300 ease-in-out shadow-lg hover:shadow-xl ' +
            (isDangerous
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-indigo-600 hover:bg-indigo-700'))
      }
      type={type}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
};

export default FixedButton;
