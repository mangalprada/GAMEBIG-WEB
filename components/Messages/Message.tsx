import { getDecoratedTime } from '../../utilities/functions/dateConvert';

interface Props {
  data: {
    message: string;
    createdAt: any;
    username: string;
  };
  isOwner: boolean;
}

export default function Message({ data, isOwner }: Props) {
  const date =
    data.createdAt && getDecoratedTime(data.createdAt.toDate().toISOString());
  return (
    <div
      className={'w-full flex ' + (isOwner ? 'justify-end' : 'justify-start')}
    >
      <div
        className={
          'rounded px-4 py-2 my-2 text-gray-700 relative font-sans ' +
          (isOwner ? 'bg-indigo-400' : 'bg-gray-300')
        }
      >
        <span className="block text-sm font-medium text-gray-600">
          {data.username}
        </span>
        <span className="block font-semibold text-lg text-gray-900">
          {data.message}
        </span>
        <span className="block text-xs font-medium text-gray-600 text-left">
          {date}
        </span>
      </div>
    </div>
  );
}
