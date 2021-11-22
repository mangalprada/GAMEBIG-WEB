import { FC } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import TextButton from '../UI/Buttons/TextButton';
import Facebook from '../UI/Icons/SocialIcons/FacebookIcon';
import GoogleIcon from '../UI/Icons/SocialIcons/GoogleIcon';
import HeaderLogo from '../UI/Logo/HeaderLogo';

const AuthComponent: FC = () => {
  const router = useRouter();
  const { signInByFacebook, signInByGoogle } = useAuth();

  return (
    <div
      className={
        'flex flex-col mb-16 px-auto w-11/12 md:w-2/5 py-5 font-san font-semibold ' +
        'rounded-lg bg-gradient-to-br from-gray-800 via-black to-gray-900'
      }
    >
      {/** Header Logo */}
      <div className="flex justify-center mb-5">
        <HeaderLogo />
      </div>

      <div className="flex justify-center">
        <span className="text-xl text-gray-300 font-sans">
          Continue by selecting
        </span>
      </div>

      <div className="flex flex-row justify-center my-2">
        {/**Facebook Button */}
        <div className="rounded-full hover:bg-gray-800 py-2 px-2.5 mx-2 cursor-pointer">
          <Facebook size={80} onClick={signInByFacebook} />
        </div>

        <span className="text-gray-400 text-sm font-sans my-auto">or</span>

        {/**Google Button */}
        <div className="rounded-full hover:bg-gray-800 p-6 mx-2 cursor-pointer">
          <GoogleIcon size={50} onClick={signInByGoogle} />
        </div>
      </div>

      {/** Privacy and Terms */}
      <div className="flex w-4/5 flex-wrap mx-auto text-center mt-2 justify-center">
        <span className="text-sm text-gray-500 tracking-wide">
          by continuing, you accept all&nbsp;
          <a
            className="text-indigo-700 underline cursor-pointer"
            href="https://www.websitepolicies.com/policies/view/wRis06Kg"
            target="_blank"
            rel="noopener noreferrer"
          >
            User Agreement
          </a>
          &nbsp;and&nbsp;
          <a
            className="text-indigo-700 underline cursor-pointer"
            href="https://www.websitepolicies.com/policies/view/574sIJnG"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </div>

      {/** Cancel */}
      <div className="text-gray-300">
        <TextButton
          name="Cancel"
          type="normal"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
};

export default AuthComponent;
