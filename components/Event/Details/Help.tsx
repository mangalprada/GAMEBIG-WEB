import AboutPage from '@/components/Page/AboutPage/AboutPage';
import { useUI } from '@/context/uiContext';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import useSWR from 'swr';
import axios from 'axios';
const { BASE_URL } = process.env;

const youtube = 'https://www.youtube.com/channel/UC8pKkOctRKu8dynpUMmi43Q';
const facebook = 'https://www.facebook.com/GameBigHQ';
const instagram = 'https://www.instagram.com/gamebig.in/';

async function getPageData(arg: string) {
  const response = await axios.get(arg);
  return response.data.data;
}

const Help = ({ pageId }: { pageId: string }) => {
  const { openSnackBar } = useUI();
  const { data: pageData } = useSWR(
    `${BASE_URL}/api/page/?pageId=${pageId}`,
    getPageData
  );

  if (!pageData) return <LurkingCat height={300} width={300} />;

  return (
    <div className="flex flex-col mt-4">
      <h2 className="font-semibold mx-auto text-xl text-gray-500">
        Contact Organizer
      </h2>
      <div className="mx-auto">
        <AboutPage data={pageData} />
      </div>
      <h2 className="font-semibold mx-auto text-xl text-gray-500 mt-4">
        Contact GAMEBIG
      </h2>
      <div className="w-11/12 mx-auto mt-4 flex flex-col justify-center items-center">
        <div className="w-11/12 grid grid-cols-2 gap-3 mx-auto text-xs ">
          <section>
            <h2 className="font-semibold text-gray-500">
              Phone Number (WhatsApp)
            </h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide rounded-md"
              onMouseDown={() => {
                navigator.clipboard.writeText('+91-7077208323');
                openSnackBar({
                  label: 'Copied!',
                  message: 'Phone Number copied to clipboard',
                  type: 'info',
                });
              }}
            >
              {'+91-7077208323'}
            </span>
          </section>
          <section>
            <h2 className="font-semibold text-gray-500">Email</h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide rounded-md"
              onMouseDown={() => {
                navigator.clipboard.writeText('info@gamebig.in');
                openSnackBar({
                  label: 'Copied!',
                  message: 'Email copied to clipboard',
                  type: 'info',
                });
              }}
            >
              {'info@gamebig.in'}
            </span>
          </section>
        </div>
        <div className="flex flex-row space-x-6 h-20">
          <div className="my-auto">
            <InstagramIcon
              size={24}
              onClick={() => window.open(instagram, '_blank')}
            />
          </div>

          <div className="my-auto">
            <FacebookIcon
              size={28}
              onClick={() => window.open(facebook, '_blank')}
            />
          </div>

          <div className="my-auto">
            <YouTubeIcon
              size={18}
              onClick={() => window.open(youtube, '_blank')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
