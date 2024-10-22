import { FC, ReactElement } from 'react';
import Image from 'next/image';
import CameraIcon from '@/components/UI/Icons/Others/Camera';

type Props = {
  photoURL?: string;
  isEditable?: boolean;
  content: string | ReactElement;
  onclick: () => void;
  openEditModal?: () => void;
};

const EventCardAvatar: FC<Props> = ({
  content,
  onclick,
  photoURL,
  isEditable,
  openEditModal,
}: Props) => {
  return (
    <div>
      <div
        className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 m-auto"
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
      {isEditable && openEditModal ? (
        <div
          className="flex justify-center items-center text-sm bg-gray-800 ring ring-indigo-800 
          rounded-full p-0.5 mt-1.5 gap-1 text-gray-400 hover:ring-indigo-600 font-semibold "
          onClick={() => openEditModal()}
        >
          Edit <CameraIcon size={16} />
        </div>
      ) : null}
    </div>
  );
};

export default EventCardAvatar;
