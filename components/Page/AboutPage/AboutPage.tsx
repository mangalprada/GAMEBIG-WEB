import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import TwitchIcon from '../../UI/Icons/SocialIcons/TwitchIcon';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';
import RedditIcon from '../../UI/Icons/SocialIcons/RedditIcon';
import DiscordIcon from '../../UI/Icons/SocialIcons/DiscordIcon';
import EmailIcon from '@/components/UI/Icons/ProfileIcons/EmailIcon';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import PhoneIcon from '@/components/UI/Icons/Others/PhoneIcon';
import WhatsApp from '@/components/UI/Icons/SocialIcons/WhatsApp';
import { useUI } from '@/context/uiContext';

const { BASE_URL } = process.env;

async function getPageData(arg: string) {
  const response = await axios.get(arg);
  return response.data.data;
}

export default function AboutPage({ pageId }: { pageId?: string }) {
  const { openSnackBar } = useUI();
  const router = useRouter();
  const { data: pageData } = useSWR(
    `${BASE_URL}/api/page/?pageId=${pageId}`,
    getPageData
  );

  if (!pageData) return <LurkingCat height={100} width={100} />;
  const isInExplore = router.pathname.split('/').includes('explore');
  return (
    <div className="w-full mx-auto font-sans py-2 ">
      <div className="flex items-center space-x-2 md:space-x-4 ml-1 mt-1 md:mt-3">
        {pageData.phone && !isInExplore ? (
          <p
            className="text-gray-500 text-xs font-semibold leading-tight mb-2 space-x-1 flex items-center"
            onMouseDown={() => {
              navigator.clipboard.writeText(pageData.phone);
              openSnackBar({
                label: 'Copied!',
                message: 'Phone number copied to clipboard',
                type: 'info',
              });
            }}
          >
            <PhoneIcon onClick={() => {}} size={20} />
            <span className="text-gray-400 text-sm">{pageData.phone}</span>
          </p>
        ) : null}
        {pageData.email ? (
          <p
            className="text-gray-500 text-xs font-semibold leading-tight mb-2 flex flex-row space-x-1"
            onMouseDown={() => {
              navigator.clipboard.writeText(pageData.email);
              openSnackBar({
                label: 'Copied!',
                message: 'Email ID copied to clipboard',
                type: 'info',
              });
            }}
          >
            <EmailIcon size={18} className={'fill-current text-slate-500'} />
            <span className="text-gray-400 text-sm">{pageData.email}</span>
          </p>
        ) : null}
      </div>
      <div className="flex flex-row items-center space-x-2 md:space-x-4 ml-1 mt-1">
        {pageData.phone ? (
          <div
            onClick={() => {
              window.open(
                `https://api.whatsapp.com/send?phone=+91${pageData.phone}`
              );
            }}
          >
            <WhatsApp size={22} />
          </div>
        ) : null}
        {pageData.youtube ? (
          <YouTubeIcon
            size={20}
            onClick={() => window.open(pageData.youtube, '_blank')}
          />
        ) : null}
        {pageData.discord ? (
          <DiscordIcon
            size={25}
            onClick={() => window.open(pageData.discord, '_blank')}
          />
        ) : null}
        {pageData.instagram ? (
          <InstagramIcon
            size={28}
            onClick={() => window.open(pageData.instagram, '_blank')}
          />
        ) : null}
        {pageData.facebook ? (
          <FacebookIcon
            size={35}
            onClick={() => window.open(pageData.facebook, '_blank')}
          />
        ) : null}
        {pageData.twitch ? (
          <TwitchIcon
            size={23}
            onClick={() => window.open(pageData.twitch, '_blank')}
          />
        ) : null}
        {pageData.reddit ? (
          <RedditIcon
            size={35}
            onClick={() => window.open(pageData.reddit, '_blank')}
          />
        ) : null}
      </div>
    </div>
  );
}
