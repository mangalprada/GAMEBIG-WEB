import { FC, ReactElement } from 'react';
import Image from 'next/image';

type Props = {
  photoURL?: string;
  content: string | ReactElement;
  onclick: () => void;
};

const EventCardAvatar: FC<Props> = ({ content, onclick, photoURL }: Props) => {
  return (
    <div className="w-full h-full m-auto" onClick={onclick}>
      {photoURL ? (
        <Image
          className="rounded-full"
          src={photoURL}
          alt="Org Profile Pic"
          layout="fill"
          objectFit="contain"
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
