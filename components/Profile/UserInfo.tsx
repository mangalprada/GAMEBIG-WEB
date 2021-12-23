import { FC } from 'react';
import { UserData } from '../../utilities/types';
import TextButton from '../UI/Buttons/TextButton';
import { useRouter } from 'next/router';
import ProfileAvatar from '../UI/Avatar/ProfileAvatar';
import CakeIcon from '../UI/Icons/ProfileIcons/CakeIcon';
import LocationIcon from '../UI/Icons/EventIcons/LocationIcon';
import EmailIcon from '../UI/Icons/ProfileIcons/EmailIcon';
import TwitchIcon from '../UI/Icons/SocialIcons/TwitchIcon';
import YouTubeIcon from '../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../UI/Icons/SocialIcons/FacebookIcon';
import TwitterIcon from '../UI/Icons/SocialIcons/TwitterIcon';
import RedditIcon from '../UI/Icons/SocialIcons/RedditIcon';
import { useAuth } from '../../context/authContext';
import ProfileVisitorAction from './ProfileVisitorAction';
import { getDecoratedDate } from '@/utilities/functions/dateConvert';
import MoreActions from './MoreActionsOnProfile';

type Props = {
  userData: UserData;
};

const UserInfo: FC<Props> = ({ userData }: Props) => {
  const router = useRouter();
  const { userData: user } = useAuth();

  const goToEditPage = () => {
    if (userData) {
      const stringifiedUsedData: string = JSON.stringify(userData);
      router.push({
        pathname: `/profile/${userData.username}/edit`,
        query: { data: stringifiedUsedData },
      });
    }
  };

  return (
    <div
      className={
        'xl:w-1/2 md:w-5/6 mx-auto ' +
        'bg-gradient-to-b from-transparent via-gray-900 to-transparent'
      }
    >
      {/**Cover Background */}
      <div
        className={
          'flex justify-end w-full bg-cover bg-no-repeat bg-center h-48 ' +
          'bg-gradient-to-tr from-green-600 via-indigo-600 to-red-600 rounded-b-lg'
        }
      >
        {/** More Option Component */}
        {userData && userData.uid === user.uid ? <MoreActions /> : null}
      </div>

      {/** Profile photo and Edit button */}
      <div className="p-4">
        <div className="flex w-full">
          <div className="flex flex-1 -mt-20">
            <ProfileAvatar photoURL={userData.photoURL} />
          </div>
          {userData.username === user.username ? (
            <TextButton
              onClick={goToEditPage}
              type="normal"
              name="EDIT PROFILE"
            />
          ) : (
            <ProfileVisitorAction
              profilePagePhotoURL={userData.photoURL}
              profilePageName={userData.name}
              profilePageUsername={userData.username}
              profilePageUid={userData.uid}
            />
          )}
        </div>
        <div className="space-y-2 justify-center w-full mt-3 ml-3">
          {/**User basic details */}
          <div>
            {userData.name ? (
              <h2 className="text-xl leading-6 font-bold text-white font-sans tracking-wide">
                {userData.name}
              </h2>
            ) : null}
            {/** User Name */}
            <p className="text-sm leading-5 font-semibold text-gray-400 mt-1  ml-1">
              @&nbsp;{userData.username}
            </p>
          </div>
          <div>
            {/** DOB */}
            {userData.dob && userData.username === user.username ? (
              <p className="text-white leading-tight mb-2 flex flex-row space-x-1">
                <CakeIcon size={20} />
                <span>{getDecoratedDate(userData.dob.toString())}</span>
              </p>
            ) : null}
            {/** Location */}
            {userData.location ? (
              <p className="text-white leading-tight mb-2 flex flex-row space-x-1">
                <LocationIcon
                  size={20}
                  className={'fill-current text-gray-300'}
                />
                <span>{userData.location}</span>
              </p>
            ) : null}
            {/** Email */}
            {userData.email && userData.username === user.username ? (
              <p className="text-white leading-tight mb-2 flex flex-row space-x-1">
                <EmailIcon size={20} className={'fill-current text-gray-300'} />
                <span>{userData.email}</span>
              </p>
            ) : null}

            {/** About me */}
            {userData.about ? (
              <p className="text-white leading-tight mb-2 ml-1 md:w-3/4 mt-2">
                {userData.about}
              </p>
            ) : null}

            {/** Social Links */}
            <div className="flex flex-row space-x-4 mt-5 ml-1">
              {userData.youtubeLink ? (
                <div className="my-auto">
                  <YouTubeIcon
                    size={20}
                    onClick={() => window.open(userData.youtubeLink, '_blank')}
                  />
                </div>
              ) : null}
              {userData.instagramLink ? (
                <div className="my-auto">
                  <InstagramIcon
                    size={28}
                    onClick={() =>
                      window.open(userData.instagramLink, '_blank')
                    }
                  />
                </div>
              ) : null}
              {userData.facebookLink ? (
                <div className="my-auto">
                  <FacebookIcon
                    size={35}
                    onClick={() => window.open(userData.facebookLink, '_blank')}
                  />
                </div>
              ) : null}
              {userData.twitchLink ? (
                <div className="my-auto">
                  <TwitchIcon
                    size={23}
                    onClick={() => window.open(userData.twitchLink, '_blank')}
                  />
                </div>
              ) : null}
              {userData.twitterLink ? (
                <div className="my-auto">
                  <TwitterIcon
                    size={24}
                    onClick={() => window.open(userData.twitterLink, '_blank')}
                  />
                </div>
              ) : null}
              {userData.redditLink ? (
                <div className="my-auto">
                  <RedditIcon
                    size={35}
                    onClick={() => window.open(userData.redditLink, '_blank')}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
