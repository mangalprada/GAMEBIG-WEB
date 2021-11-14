import { useUI } from '@/context/uiContext';
import { FC } from 'react';
import ShareIcon from '../Icons/Others/ShareIcon';

type Props = {
  link: string;
  game: string;
};

const ShareEventLink: FC<Props> = ({ link, game }) => {
  const { openShareModal } = useUI();

  function handleShareClick() {
    openShareModal(
      link,
      `Hey there!! Join this exciting ${game} event on gamebig.in`
    );
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
