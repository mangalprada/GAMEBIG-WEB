import { useState } from 'react';
import { useRouter } from 'next/router';
import MoreIcon from '../UI/Icons/ProfileIcons/MoreIcon';
import CloseIcon from '../UI/Icons/SnackbarIcons/CloseIcon';
import { useAuth } from '@/context/authContext';

const MoreActions = () => {
  const { userData: user, signout } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const router = useRouter();
  const goToSetting = () => {
    router.push(`/profile/${user.username}/settings`);
  };

  return (
    <div className="absolute mt-2 mr-3">
      {showMore ? (
        <div
          className={
            'flex flex-col bg-gray-900 text-white py-4 px-5 rounded-lg ' +
            'space-y-1 font-semibold tracking-wide'
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
            onClick={goToSetting}
          >
            Settings
          </span>
          <span className="cursor-pointer hover:text-red-400" onClick={signout}>
            Signout
          </span>
        </div>
      ) : (
        <div className="p-3 cursor-pointer" onClick={toggleShowMore}>
          <MoreIcon size={36} />
        </div>
      )}
    </div>
  );
};

export default MoreActions;
