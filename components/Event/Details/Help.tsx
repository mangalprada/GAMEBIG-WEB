import AboutPage from '@/components/Page/AboutPage/AboutPage';
import { fetchPageData } from '../../../libs/fetchPageData';
import { useEffect, useState } from 'react';
import { PageFormData } from '@/utilities/page/types';
import { useUI } from '@/context/uiContext';
import YouTubeIcon from '../../UI/Icons/SocialIcons/YouTubeIcon';
import InstagramIcon from '../../UI/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../UI/Icons/SocialIcons/FacebookIcon';

const youtube = 'https://www.youtube.com/channel/UC8pKkOctRKu8dynpUMmi43Q';
const facebook = 'https://www.facebook.com/GameBigHQ';
const instagram = 'https://www.instagram.com/gamebig.in/';

const Help = ({ pageId }: { pageId: string }) => {
  const { openSnackBar } = useUI();
  const [pageData, setPageData] = useState<PageFormData>();
  useEffect(() => {
    const getPageData = async () => {
      const data = await fetchPageData(pageId);
      setPageData(data);
    };
    getPageData();
  }, [pageId]);

  if (!pageData) return null;
  return (
    <div>
      <AboutPage data={pageData} />
      <div className="w-11/12 mt-6 flex justify-start">
        <h2 className="font-semibold mx-auto text-xl text-gray-500">
          Contact GAMEBIG
        </h2>
      </div>
      <div className="w-11/12 mx-auto mt-4 flex flex-col justify-center items-center">
        <div className="w-11/12 grid grid-cols-2 gap-3 mx-auto ">
          <section>
            <h2 className="font-semibold text-gray-500">
              Phone Number (WhatsApp)
            </h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide rounded-md"
              onClick={() => {
                navigator.clipboard.writeText('+91-7077208323');
                openSnackBar({
                  label: 'Copied!',
                  message: 'Phone Number copied to clipboard',
                  type: 'warning',
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
              onClick={() => {
                navigator.clipboard.writeText('info@gamebig.in');
                openSnackBar({
                  label: 'Copied!',
                  message: 'Email copied to clipboard',
                  type: 'warning',
                });
              }}
            >
              {'info@gamebig.in'}
            </span>
          </section>
        </div>
        <div className="flex flex-row space-x-6 mt-5 ml-1 h-20">
          <div className="my-auto">
            <InstagramIcon
              size={38}
              onClick={() => window.open(instagram, '_blank')}
            />
          </div>

          <div className="my-auto">
            <FacebookIcon
              size={45}
              onClick={() => window.open(facebook, '_blank')}
            />
          </div>

          <div className="my-auto">
            <YouTubeIcon
              size={28}
              onClick={() => window.open(youtube, '_blank')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
