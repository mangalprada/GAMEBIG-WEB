import { useState } from 'react';
import { Descendant } from 'slate';
import { useAuth } from '@/context/authContext';
import { PostType } from '@/utilities/post/PostType';
import Editor from '../UI/Inputs/Editor';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  } as Descendant,
];
//TODO: On save, insert post in the newsfeed and clean the editor
//TODO: dont allow to save empty editor
const CreatePost = () => {
  const {
    userData: { uid, username, photoURL, name },
  } = useAuth();
  const [content, setContent] = useState<Descendant[]>(initialValue);

  async function savePost() {
    const postData: PostType = {
      content: content,
      createdAt: new Date(),
      user: { uid, username, photoURL, name },
      noOfLikes: 0,
      noOfComments: 0,
      noOfShares: 0,
      likedBy: [],
      sharedBy: [],
    };
    let { BASE_URL } = process.env;
    let response = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
    setContent(initialValue);
  }

  return (
    <div className="w-11/12 md:w-1/2 flex flex-col mx-auto my-5">
      <Editor value={content} isReadOnly={false} onChange={setContent} />
      <div className="flex justify-end mr-2 mt-1.5">
        <div className="rounded-md bg-indigo-600 px-4 py-1" onClick={savePost}>
          <span className="text-xl text-white font-sans cursor-pointer font-semibold">
            Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
