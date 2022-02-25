import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BasicUserType } from '@/utilities/types';

const HorizontalProfile = ({
  user,
  isTransparent,
}: {
  user: BasicUserType;
  isTransparent?: boolean;
}) => {
  const router = useRouter();

  const openProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };
  return (
    <div
      className={
        'm-2 py-1.5 px-2 md:py-1 md:px-4 rounded-md ' +
        (isTransparent ? '' : 'bg-gray-800')
      }
    >
      <section className="flex gap-3 items-center justify-start ">
        {user.photoURL ? (
          <div
            className="relative h-8 w-8 md:h-12 md:w-12 cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              openProfile(user.username);
            }}
          >
            <Image
              src={user.photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        ) : null}
        <section className="flex flex-col cursor-pointer">
          <span
            className="font-semibold text-sm  md:text-lg text-gray-300 hover:text-indigo-600"
            onClick={(event) => {
              event.stopPropagation();
              openProfile(user.username);
            }}
          >
            {user.name}
          </span>
          <span
            className="font-semibold text-gray-500 text-xs md:text-base"
            onClick={(event) => {
              event.stopPropagation();
              openProfile(user.username);
            }}
          >
            @{user.username}
          </span>
        </section>
      </section>
    </div>
  );
};

export default HorizontalProfile;
