import { useEffect, useState } from 'react';
import Post from './Post';
import Comment from './Comment';
import { Descendant } from 'slate';
import { useAuth } from '@/context/authContext';
import { CommentType } from '@/utilities/comment/commentTypes';
import Editor from '../UI/Inputs/Editor';

let { BASE_URL } = process.env;
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  } as Descendant,
];

const PostDetails = ({ post, closeModal, isModalOpen }: any) => {
  const {
    userData: { uid, username, photoURL, name },
  } = useAuth();
  const [content, setContent] = useState<Descendant[]>(initialValue);
  const [comments, setComments] = useState<CommentType[]>([]);

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
      setContent(initialValue);
      setComments([...comments, commentData]);
    } catch (err) {
      console.log(err);
    }
  }

  function removeComment(commentId: string) {
    let newComments = comments.filter(
      (comment: CommentType) => comment._id !== commentId
    );
    setComments(newComments);
  }

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mb-8">
      <Post
        post={post}
        isModalOpen={isModalOpen}
        onDelete={(id) => closeModal()}
      />
      <div className="bg-slate-900 p-2 rounded-md">
        <Editor value={content} isReadOnly={false} onChange={setContent} />
        <div className="flex justify-end mr-2 mt-2">
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
          <Comment
            key={index}
            comment={item}
            removeComment={removeComment}
            postId={post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
