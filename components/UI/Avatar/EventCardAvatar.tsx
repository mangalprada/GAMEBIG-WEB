import { FC, ReactElement } from 'react';

type Props = {
  content: string | ReactElement;
  onclick: () => void;
};

const EventCardAvatar: FC<Props> = ({ content, onclick }: Props) => {
  return (
    <div
      className="flex justify-center w-6 h-6 sm:w-12 sm:h-12 bg-indigo-600 rounded-full items-center cursor-pointer"
      onClick={onclick}
    >
      <span className="self-center text:lg sm:text-2xl font-bold tracking-wide text-gray-900 font-sans">
        {content?.toString().toUpperCase()}
      </span>
    </div>
  );
};

export default EventCardAvatar;
