import { useAuth } from '@/context/authContext';
import { getDecoratedTime } from '@/utilities/functions/dateConvert';
import Image from 'next/image';

type Props = {
  receiverPhotoURL: string;
  receiverName: string;
  receiverUsername: string;
  receiverUid: string;
  lastMessage?: string;
  unseen: any;
  updatedAt: any;
  onClick: (user: any) => void;
  noOfUnseen: number;
};

const MessageRoom = ({
  receiverPhotoURL,
  receiverName,
  receiverUsername,
  receiverUid,
  lastMessage,
  updatedAt,
  onClick,
  noOfUnseen,
}: Props) => {
  const name =
    receiverName && receiverName.length > 18
      ? `${receiverName.slice(0, 18)}...`
      : receiverName;
  const getTime = () => {
    try {
      return getDecoratedTime(updatedAt.toDate().toISOString());
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return (
    <div
      onClick={() =>
        onClick({
          receiverUsername,
          receiverName,
          receiverPhotoURL,
          receiverUid,
        })
      }
      className={
        'flex items-center text-gray-300 font-sans cursor-pointer ' +
        'bg-gray-900 hover:bg-gray-900/70 w-full gap-3 px-3 py-3.5 mx-1 mb-1 rounded-md'
      }
    >
      <div className="relative h-12 w-14 ">
        {receiverPhotoURL ? (
          <Image
            src={receiverPhotoURL}
            alt="Picture of a friend"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <span className="text-center tracking-wide text-gray-200 font-medium">
            No Pic
          </span>
        )}
      </div>
      <div className="flex flex-col w-full pr-2">
        <div className="flex justify-between items-center">
          <span className="text-lg  font-semibold">{name}</span>
          <span className="text-sm text-gray-400 text-right">{getTime()}</span>
        </div>
        <div className="flex justify-between items-center">
          {lastMessage && (
            <h1 className="text-base font-medium text-gray-500">
              {lastMessage}
            </h1>
          )}
          {noOfUnseen > 0 && (
            <div className="flex justify-center items-center rounded-full h-6 w-6 bg-indigo-600">
              <span className="text-gray-50 text-sm font-bold font-sans">
                {noOfUnseen}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageRoom;
