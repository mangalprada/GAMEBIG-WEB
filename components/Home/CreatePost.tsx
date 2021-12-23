import { ChangeEvent, useState } from 'react';
import TextArea from '../UI/Inputs/TextArea';
import EditorJS from '@editorjs/editorjs';
import { useAuth } from '@/context/authContext';
import { PostType } from '@/utilities/post/PostType';

const CreatePost = () => {
  const {
    userData: { uid, username, photoURL, name },
  } = useAuth();
  const [content, setContent] = useState('');

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
    let response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
    setContent('');
  }

  return (
    <div className="w-11/12 md:w-1/2 flex flex-col mx-auto">
      <TextArea
        labelName="Create Post"
        name="post"
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setContent(target.value);
        }}
        value={content}
        placeHolder="What's on your mind?"
      />
      <div className="flex justify-end mr-2">
        <div className="rounded-md bg-indigo-600 px-4 py-1" onClick={savePost}>
          <span className="text-xl text-white font-sans cursor-pointer">
            Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
