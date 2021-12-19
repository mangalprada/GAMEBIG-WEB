import { FC } from 'react';
import Facebook from '../UI/Icons/SocialIcons/FacebookIcon';
import Instagram from '../UI/Icons/SocialIcons/InstagramIcon';
import Twitter from '../UI/Icons/SocialIcons/TwitterIcon';
import HeaderLogo from '../UI/Logo/HeaderLogo';

const FACEBOOK_URL = 'https://www.facebook.com/GameBigHQ';
const TWITTER_URL = 'https://twitter.com/GameBigHQ';
const INSTAGRAM_URL = 'https://www.instagram.com/gamebighq';

const FooterComponent: FC = () => {
  function handleSocialButtonClick(link: string) {
    window.open(link, '_blank', 'noopener noreferrer');
  }

  return (
    <footer className="bg-indigo-600 pt-8 pb-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">Contact Us</h4>
            <h5 className="text-lg mt-0 mb-2 font-medium">
              Find us on any of these platforms, we&apos;ll respond in 1-2
              business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex flex-row flex-wrap">
              <button
                className={
                  'bg-white shadow-md shadow-gray-900/50 h-10 w-10 ' +
                  'rounded-full outline-none mr-2 flex justify-center items-center ' +
                  'hover:-translate-y-1 transition ease-in-out duration-200'
                }
                onClick={() => handleSocialButtonClick(FACEBOOK_URL)}
              >
                <Facebook size={30} />
              </button>
              <button
                className={
                  'bg-white shadow-md shadow-gray-900/50 h-10 w-10 ' +
                  'rounded-full outline-none mr-2 flex justify-center items-center ' +
                  'hover:-translate-y-1 transition ease-in-out duration-200'
                }
                onClick={() => handleSocialButtonClick(TWITTER_URL)}
              >
                <Twitter size={20} />
              </button>
              <button
                className={
                  'bg-white shadow-md shadow-gray-900/50 h-10 w-10 ' +
                  'rounded-full outline-none mr-2 flex justify-center items-center ' +
                  'hover:-translate-y-1 transition ease-in-out duration-200'
                }
                onClick={() => handleSocialButtonClick(INSTAGRAM_URL)}
              >
                <Instagram size={25} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="w-full lg:w-4/12 ml-auto lg:mt-0 mt-5 mb-6">
              <span className="block uppercase text-gray-900 font-bold mb-2">
                Other Resources
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    className={
                      'font-semibold block pb-2 text-sm hover:text-white ' +
                      'transition ease-in-out duration-200 tracking-wide'
                    }
                    href="https://www.websitepolicies.com/policies/view/wRis06Kg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    User Agreement
                  </a>
                </li>
                <li>
                  <a
                    className={
                      'font-semibold block pb-2 text-sm hover:text-white ' +
                      ' transition ease-in-out duration-200 tracking-wide'
                    }
                    href="https://www.websitepolicies.com/policies/view/574sIJnG"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-800" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div
              className={
                'bg-black mx-auto w-min h-min px-4 py-1 ' +
                'rounded-md flex justify-center items-center'
              }
            >
              <HeaderLogo />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
