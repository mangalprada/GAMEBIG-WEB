import { ChangeEvent, useEffect, useState } from 'react';
import Post from './Post';
import Comment from './Comment';
import TextArea from '../UI/Inputs/TextArea';
import { useAuth } from '@/context/authContext';
import { CommentType } from '@/utilities/comment/commentTypes';

let { BASE_URL } = process.env;

const PostDetails = ({ post, closeModal, isModalOpen }: any) => {
  const {
    userData: { uid, username, photoURL, name },
  } = useAuth();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(`api/commentOnPost/?postId=${post._id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setComments(data.message);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, [post._id]);

  async function saveComment() {
    const commentData: CommentType = {
      postId: post._id,
      content: content,
      createdAt: new Date(),
      user: { uid, username, photoURL, name },
      noOfLikes: 0,
      noOfReplies: 0,
      likedBy: [],
      repliedBy: [],
    };
    try {
      let response = await fetch(`${BASE_URL}/api/commentOnPost`, {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
      setContent('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mb-8">
      <Post post={post} isModalOpen={isModalOpen} />
      <div>
        <TextArea
          labelName="Comment"
          name="comment"
          onChangeHandler={(e: ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            setContent(target.value);
          }}
          value={content}
        />
        <div className="flex justify-end mr-2">
          <div
            className="rounded-md bg-indigo-600 py-1 px-4"
            onClick={saveComment}
          >
            <span className="text-lg text-white font-sans cursor-pointer">
              Comment
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        {comments.map((item: CommentType, index: number) => (
          <Comment key={index} comment={item} />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
