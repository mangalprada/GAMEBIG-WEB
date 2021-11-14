import { PageFormData } from '../../../utilities/page/types';
import TwitchIcon from '../../UI/Icons/SocialIcons/TwitchIcon';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';
import RedditIcon from '../../UI/Icons/SocialIcons/RedditIcon';
import DiscordIcon from '../../UI/Icons/SocialIcons/DiscordIcon';

interface Props {
  data: PageFormData;
}

export default function AboutPage({ data }: Props) {
  return (
    <div
      className={
        'xl:w-1/2 md:w-5/6 mx-auto font-sans px-5 pt-10 ' +
        'bg-gradient-to-b from-transparent to-gray-900 ' +
        'rounded-b-3xl'
      }
    >
      <section className="flex flex-col">
        <span className="font-semibold text-gray-500">About us</span>
        <span className="text-gray-100 tracking-wide pt-1">{data.about}</span>
      </section>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-8 space-y-5">
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500">Official Email</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.email}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500">Contact Number</span>
          <span className="text-gray-100 tracking-wide pt-1">{data.phone}</span>
        </section>
        <section className="flex flex-col">
          <span className="font-semibold text-gray-500">Official Website</span>
          <span className="text-gray-100 tracking-wide pt-1">
            {data.website ? data.website : 'Not Available'}
          </span>
        </section>
      </div>

      {/** Social Links */}
      <div className="flex flex-row space-x-6 mt-5 ml-1 h-20">
        {data.youtube ? (
          <div className="my-auto">
            <YouTubeIcon
              size={20}
              onClick={() => window.open(data.youtube, '_blank')}
            />
          </div>
        ) : null}
        {data.discord ? (
          <div className="my-auto">
            <DiscordIcon
              size={25}
              onClick={() => window.open(data.discord, '_blank')}
            />
          </div>
        ) : null}
        {data.instagram ? (
          <div className="my-auto">
            <InstagramIcon
              size={28}
              onClick={() => window.open(data.instagram, '_blank')}
            />
          </div>
        ) : null}
        {data.facebook ? (
          <div className="my-auto">
            <FacebookIcon
              size={35}
              onClick={() => window.open(data.facebook, '_blank')}
            />
          </div>
        ) : null}
        {data.twitch ? (
          <div className="my-auto">
            <TwitchIcon
              size={23}
              onClick={() => window.open(data.twitch, '_blank')}
            />
          </div>
        ) : null}
        {data.reddit ? (
          <div className="my-auto">
            <RedditIcon
              size={35}
              onClick={() => window.open(data.reddit, '_blank')}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
