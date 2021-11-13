import { useUI } from '@/context/uiContext';
import { FC } from 'react';
import ShareIcon from '../Icons/Others/ShareIcon';

type Props = {
  link: string;
};

const ShareEventLink: FC<Props> = ({ link }) => {
  const { openShareModal } = useUI();

  function handleShareClick() {
    openShareModal(link);
  }

  return (
    <div
      className={
        'h-9 w-9 flex justify-center items-center rounded-full ' +
        'hover:bg-gray-800 relative -mt-1 cursor-pointer'
      }
      onClick={handleShareClick}
      title="Share Link to this Event"
    >
      <ShareIcon size={25} />
    </div>
  );
};

export default ShareEventLink;
