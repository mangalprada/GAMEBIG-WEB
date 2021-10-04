import { useEffect, useRef } from 'react';
import Message from './Message';

export default function ChatContainer() {
  const scrollLast = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className="flex flex-col bg-white rounded-t-md h-96 mx-5 mt-5 overflow-y-scroll md:px-4">
      <Message isOwner={true} />
      <Message isOwner={true} />
      <Message isOwner={false} />
      <Message isOwner={true} />
      <Message isOwner={false} />
      <Message isOwner={true} />
      <Message isOwner={true} />
      <Message isOwner={true} />
      <div ref={scrollLast}></div>
    </div>
  );
}
