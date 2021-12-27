import { MouseEvent, useState } from 'react';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import CloseIcon from '../UI/Icons/SnackbarIcons/CloseIcon';

type Props = {
  editItem: () => void;
  deleteItem: () => void;
};

const MoreActions = ({ editItem, deleteItem }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = (e: MouseEvent) => {
    e.stopPropagation();
    setShowMore(!showMore);
  };
  //TODO : Close on Click outside, remove close Icon
  return (
    <div className="absolute mt-2 mr-3">
      {showMore ? (
        <div
          className={
            'flex flex-col bg-gray-700 text-white py-4 px-5 rounded-lg ' +
            ' font-semibold tracking-wide'
          }
        >
          <span
            onClick={toggleShowMore}
            className="flex justify-end cursor-pointer"
          >
            <CloseIcon size={16} />
          </span>
          <span
            className="cursor-pointer hover:text-blue-400"
            onClick={editItem}
          >
            Edit
          </span>
          <span
            className="cursor-pointer hover:text-red-400"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              deleteItem();
            }}
          >
            Delete
          </span>
        </div>
      ) : (
        <div
          className="p-3 cursor-pointer"
          onClick={(e: MouseEvent) => toggleShowMore(e)}
        >
          <MoreIcon size={24} />
        </div>
      )}
    </div>
  );
};

export default MoreActions;
