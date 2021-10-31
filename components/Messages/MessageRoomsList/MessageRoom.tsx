import Image from 'next/image';

type Props = {
  receiverPhotoURL: string;
  receiverName: string;
  receiverUsername: string;
  lastMessage?: string;
  onClick: (user: any) => void;
};

const MessageRoom = ({
  receiverPhotoURL,
  receiverName,
  receiverUsername,
  lastMessage,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() =>
        onClick({ receiverUsername, receiverName, receiverPhotoURL })
      }
      className="flex items-center justify-items-stretch text-gray-300 font-sans font-semibold 
    bg-gray-900 w-full gap-3 px-3 py-3.5  m-1 rounded-md"
    >
      <div className="relative h-12 w-12 ">
        <Image
          src={receiverPhotoURL}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full pr-2">
        <div className="flex justify-between">
          <span className="text-lg">{receiverName}</span>
          <span className="text-xm">{receiverUsername}</span>
        </div>
        {lastMessage && (
          <h1 className="text-base text-gray-500">{lastMessage}</h1>
        )}
      </div>
    </div>
  );
};

export default MessageRoom;

//todo: show time of last message and name of the username
