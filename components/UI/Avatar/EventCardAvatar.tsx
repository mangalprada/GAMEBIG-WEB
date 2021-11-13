import { FC, ReactElement } from 'react';

type Props = {
  content: string | ReactElement;
};

const EventCardAvatar: FC<Props> = ({ content }: Props) => {
  return (
    <div className="flex justify-center w-12 h-12 bg-indigo-600 rounded-full items-center">
      <span className="self-center text-2xl font-bold tracking-wide text-gray-900 font-sans">
        {content.toString().toUpperCase()}
      </span>
    </div>
  );
};

export default EventCardAvatar;
