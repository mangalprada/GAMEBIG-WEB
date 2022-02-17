import { FC } from 'react';
import Image from 'next/image';

type Props = {
  photoURL?: string;
};

const ProfileAvatar: FC<Props> = ({ photoURL }: Props) => {
  return (
    <div
      className={
        'rounded-full relative h-40 w-40 md:h-48 md:w-48  border-4 bg-black border-black ' +
        'flex flex-col justify-center'
      }
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
        <span className="text-center tracking-wide text-gray-200 font-medium">
          No Pic
        </span>
      )}
      <div className="absolute"></div>
    </div>
  );
};

export default ProfileAvatar;
