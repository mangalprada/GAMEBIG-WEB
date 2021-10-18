import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/authContext';
import { postMessage } from '../../lib/chatMethods';
import { InputChat } from '../../utilities/contact/contact';

export default function TypeContainer() {
  const [message, setMessage] = useState<string>('');
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chat: InputChat = {
      userName: user.username,
      userId: user.uid,
      msg: message,
      subHeader: '',
    };
    const chatId = await postMessage(chat);
    setMessage('');
  };

  return (
    <form
      className="w-full pb-3 flex items-center justify-between pt-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        aria-placeholder="Type Here"
        placeholder="Type Here..."
        className={
          'py-2 mx-3 pl-5 block w-full rounded-full bg-gray-700 ' +
          'outline-none font-semibold font-sans focus:text-gray-200 tracking-wide'
        }
        type="text"
        name="message"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <button className="outline-none focus:outline-none" type="submit">
        <svg
          className="fill-current text-indigo-600 h-7 w-7 origin-center transform rotate-90"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 
            15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </form>
  );
}
