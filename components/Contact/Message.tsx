import { Chat } from '../../utilities/contact/contact';
import { getDecoratedTime } from '../../utilities/functions/dateConvert';

interface Props {
  data: Chat;
  isOwner: boolean;
}

export default function Message({ data, isOwner }: Props) {
  const date =
    data.createdAt && getDecoratedTime(data.createdAt.toDate().toISOString());

  return (
    <>
      {isOwner ? (
        <div className="w-full flex justify-end">
          <div className="rounded px-4 py-2 my-2 text-gray-700 relative bg-green-200">
            <span className="block text-gray-500">{data.userName}</span>
            <span className="block font-medium text-black">{data.msg}</span>
            <span className="block text-xs text-gray-500 text-left">
              {date}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-start">
          <div className="rounded px-4 py-2 my-2 text-gray-700 relative bg-gray-200">
            <span className="block text-gray-500">{data.userName}</span>
            <span className="block font-medium text-black">{data.msg}</span>
            <span className="block text-xs text-gray-500 text-left">
              {date}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
