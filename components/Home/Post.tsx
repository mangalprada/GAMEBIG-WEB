import { useState } from 'react';
import FilledHeartIcon from '../UI/Icons/Post/FilledHeart';
import EmptyHeartIcon from '../UI/Icons/Post/EmptyHeart';
import CommentsIcon from '../UI/Icons/Post/Comments';
import HorizontalProfile from '../Profile/HorizontalProfile';
import { useAuth } from '@/context/authContext';
import { PostType } from '@/utilities/post/PostType';
import MoreActions from './MoreActionsOnPost';
import Editor from '../UI/Inputs/Editor';

const axios = require('axios').default;

type Props = {
  post: PostType;
  setSelectedPost?: (post: PostType) => void;
  openModal?: () => void;
  isModalOpen?: boolean;
};

const Post = ({ post, setSelectedPost, openModal, isModalOpen }: Props) => {
  const { userData } = useAuth();
  const { content, user, noOfLikes, noOfComments, likedBy } = post;

  const isLikedByUser = likedBy.includes(user.uid);
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likes, setlikes] = useState(noOfLikes);
  let { BASE_URL } = process.env;
  async function likehandler(event: MouseEvent) {
    event.stopPropagation();
    try {
      axios.get(`${BASE_URL}/api/likePost`, {
        params: { postId: post._id, likedBy: userData.uid },
      });
      setIsLiked(true);
      setlikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  }

  async function unLikehandler(event: MouseEvent) {
    event.stopPropagation();
    try {
      axios.get(`${BASE_URL}/api/likePost`, {
        params: { postId: post._id, unLikedBy: userData.uid },
      });
      setIsLiked(false);
      setlikes(likes - 1);
    } catch (err) {
      console.log(err);
    }
  }

  function showModal() {
    if (!isModalOpen) {
      setSelectedPost && setSelectedPost(post);
      openModal && openModal();
    }
  }

  function editPost() {
    console.log('edit comment');
  }

  function deletePost() {
    console.log('delete comment');
  }

  return (
    <div
      className="w-full flex flex-col mx-auto bg-gray-900 rounded-md m-1 px-4 py-1 "
      onClick={showModal}
    >
      <div className="flex items-center	justify-between">
        <HorizontalProfile user={user} isTransparent />
        <div className="rounded-full h-3.5 flex	items-center justify-center">
          {userData && userData.uid === user.uid ? (
            <MoreActions editItem={editPost} deleteItem={deletePost} />
          ) : null}
        </div>
      </div>
      <Editor value={content} isreadOnly />
      <div className=" h-16  flex items-center justify-around	">
        <div className="flex items-center	gap-3	" onClick={showModal}>
          <CommentsIcon size={24} />
          <div className="text-sm text-gray-50">{noOfComments}</div>
        </div>
        <div className="flex items-center	gap-3">
          {isLiked ? (
            <FilledHeartIcon size={24} onClick={unLikehandler} />
          ) : (
            <EmptyHeartIcon size={24} onClick={likehandler} />
          )}
          <div className="text-sm text-gray-50">{likes}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
