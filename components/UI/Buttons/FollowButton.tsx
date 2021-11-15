import { FC } from 'react';

type Props = {
  name: string;
  onClick: () => void;
};

const FollowButton: FC<Props> = ({ onClick, name }) => {
  return (
    <div
      onClick={onClick}
      className={
        'flex items-center w-3/4 mx-auto justify-center mt-3 ' +
        'py-1 px-4 rounded-md bg-indigo-500 hover:bg-green-400/80 ' +
        'cursor-pointer active:bg-indigo-600'
      }
    >
      <span className={'text-gray-900 font-semibold font-sans text-lg'}>
        {name}
      </span>
    </div>
  );
};

export default FollowButton;
