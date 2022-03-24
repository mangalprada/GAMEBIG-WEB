import AboutPage from '@/components/Page/AboutPage/AboutPage';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';
import DiscordIcon from '../../UI/Icons/SocialIcons/DiscordIcon';
import WhatsApp from '@/components/UI/Icons/SocialIcons/WhatsApp';

const youtube = 'https://www.youtube.com/channel/UC8pKkOctRKu8dynpUMmi43Q';
const facebook = 'https://www.facebook.com/GameBigHQ';
const instagram = 'https://www.instagram.com/gamebig.in/';
const discord = 'https://discord.gg/SSpXEhAV4V';

const Help = ({ pageId }: { pageId: string }) => {
  return (
    <div className="flex flex-col mt-4">
      <h2 className="font-semibold mx-auto text-2xl text-gray-500">
        Contact Organizer
      </h2>
      <div className="mx-auto">
        <AboutPage pageId={pageId} />
      </div>
      <h2 className="font-semibold mx-auto text-base text-gray-600 mt-6">
        Contact GAMEBIG
      </h2>
      <div className="w-11/12 mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-4 mt-2">
          <div
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?phone=+919861408548`);
            }}
          >
            <WhatsApp size={22} />
          </div>
          <div className="my-auto">
            <DiscordIcon
              size={25}
              onClick={() => window.open(discord, '_blank')}
            />
          </div>
          <div className="my-auto">
            <InstagramIcon
              size={28}
              onClick={() => window.open(instagram, '_blank')}
            />
          </div>
          <div className="my-auto">
            <FacebookIcon
              size={34}
              onClick={() => window.open(facebook, '_blank')}
            />
          </div>
          <div className="my-auto">
            <YouTubeIcon
              size={20}
              onClick={() => window.open(youtube, '_blank')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
