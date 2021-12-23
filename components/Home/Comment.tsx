import Image from 'next/image';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import { useRouter } from 'next/router';
import { CommentType } from '@/utilities/comment/commentTypes';

const Comment = ({ comment }: { comment: CommentType }) => {
  const { content, user } = comment;
  const router = useRouter();
  const openProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="bg-gray-900 rounded-md pb-3 px-2 py-1.5">
      <div className=" px-2 md:py-1 md:px-4 rounded-md flex justify-between">
        <section
          className="flex gap-3 items-center justify-start "
          onClick={() => openProfile(user.username)}
        >
          {user.photoURL ? (
            <div className="relative h-4 w-4 md:h-6 md:w-6 cursor-pointer">
              <Image
                src={user.photoURL}
                alt="Picture of a friend"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
          ) : null}
          <section className="flex flex-col cursor-pointer">
            <span className="font-semibold text-xs text-gray-500 hover:text-indigo-600">
              {user.name}
            </span>
            <span className="font-semibold text-gray-500 text-xs">
              @{user.username}
            </span>
          </section>
        </section>
        <MoreIcon size={20} />
      </div>
      <span className="text-sm md:text-base text-white font-sans cursor-pointer ml-6">
        {content}
      </span>
    </div>
  );
};

export default Comment;
