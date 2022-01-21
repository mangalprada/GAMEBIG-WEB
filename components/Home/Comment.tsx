import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import { useRouter } from 'next/router';
import { CommentType } from '@/utilities/comment/commentTypes';
import MoreActions from './MoreActionsOnPost';
import { useAuth } from '@/context/authContext';
import Editor from '../UI/Inputs/Editor';
let { BASE_URL } = process.env;

const Comment = ({
  comment,
  removeComment,
  postId,
}: {
  comment: CommentType;
  removeComment: (id: string) => void;
  postId: string;
}) => {
  const { userData } = useAuth();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [content, setContent] = useState(comment.content);
  const { user, _id } = comment;
  const router = useRouter();
  const openProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  function makeCommentEditable() {
    setIsReadOnly(false);
  }

  function deleteComment() {
    try {
      axios.delete(`${BASE_URL}/api/commentOnPost`, {
        params: { commentId: _id, postId },
      });
      removeComment(_id);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateComment() {
    //TODO
    try {
      axios.put(`${BASE_URL}/api/commentOnPost`, {
        params: { _id, postId },
      });
      setIsReadOnly(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-900 rounded-md pb-3 px-2 py-1.5">
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
        <div className="mr-4">
          {userData && userData.uid === user.uid ? (
            <MoreActions
              editItem={makeCommentEditable}
              deleteItem={deleteComment}
            />
          ) : null}
        </div>
      </div>
      <Editor value={content} isReadOnly={isReadOnly} onChange={setContent} />
      {isReadOnly ? null : (
        <div className="flex justify-end mr-2 mt-2">
          <div
            className="rounded-md bg-indigo-600 py-1 px-4"
            onClick={updateComment}
          >
            <span className="text-lg text-white font-sans cursor-pointer">
              Save
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
