import { FC, ReactElement } from 'react';
import Image from 'next/image';
import CameraIcon from '@/components/UI/Icons/Others/Camera';

type Props = {
  photoURL?: string;
  content: string | ReactElement;
  onclick: () => void;
};

const EventCardAvatar: FC<Props> = ({ content, onclick, photoURL }: Props) => {
  return (
    <div
      className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 m-auto"
      onClick={onclick}
    >
      {photoURL ? (
        <Image
          className="rounded-full"
          src={photoURL}
          alt="Org Profile Pic"
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="flex justify-center m-auto w-full h-full bg-indigo-600 rounded-full cursor-pointer">
          <span className="self-center text:lg sm:text-2xl font-bold tracking-wide text-gray-900 font-sans">
            {content?.toString().toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default EventCardAvatar;
