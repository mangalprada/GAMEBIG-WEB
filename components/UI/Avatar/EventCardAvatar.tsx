import { FC, ReactElement } from 'react';
import Image from 'next/image';

type Props = {
  photoURL?: string;
  content: string | ReactElement;
  onclick: () => void;
};

const EventCardAvatar: FC<Props> = ({ content, onclick, photoURL }: Props) => {
  return (
    <div
      className="flex m-auto justify-center w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full items-center cursor-pointer"
      onClick={onclick}
    >
      {photoURL ? (
        <Image
          className="rounded-full"
          src={photoURL}
          alt="User Profile Pic"
          layout="fill"
          objectFit="contain"
        />
      ) : (
        <span className="self-center text:lg sm:text-xl font-bold tracking-wide text-gray-900 font-sans">
          {content?.toString().toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default EventCardAvatar;
