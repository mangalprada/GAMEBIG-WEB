import { FC } from 'react';
import Aux from 'hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import { useUI } from '@/context/uiContext';
import WhatsApp from '../Icons/SocialIcons/WhatsApp';

const ShareLinkModal: FC = () => {
  const { shareLink, closeShareModal, openSnackBar } = useUI();

  if (!shareLink.isModalOpen) return null;

  function copyClickHandler() {
    navigator.clipboard.writeText(shareLink.link);
    openSnackBar({
      type: 'info',
      label: 'Copied',
      message: 'Link copied to clipboard',
    });
  }

  return (
    <Aux>
      <Backdrop
        isOpen={shareLink.isModalOpen}
        closeBackdrop={closeShareModal}
      />
      <div
        className={
          'px-auto h-[250px] w-11/12 md:w-1/3 fixed inset-0 bg-gray-900 ' +
          'm-auto z-20 overflow-y-auto rounded-md'
        }
      >
        {/** Close Button */}
        <div
          className={
            'flex justify-center items-center mr-5 mt-3 h-8 w-8 ' +
            'absolute -right-2 hover:bg-gray-800 rounded-full cursor-pointer'
          }
          onClick={closeShareModal}
          title="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current text-white"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d={
                'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 ' +
                '1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 ' +
                '1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 ' +
                '10 4.293 5.707a1 1 0 010-1.414z'
              }
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h5 className="w-4/5 mx-auto mt-4 text-gray-300 text-lg font-semibold">
          Share
        </h5>

        {/** Social Share */}
        <div className={'w-4/5 mx-auto mt-5'}>
          <section
            className="flex flex-col cursor-pointer w-16 items-center"
            onClick={() => {
              window.open(
                `https://api.whatsapp.com/send/?phone&text=${shareLink.link}` +
                  `%0AHey%20there!!%20Join%20this%20exciting%20event%20on%20gamebig.in`,
                '_blank'
              );
            }}
            title="WhatsApp"
          >
            <WhatsApp size={30} />
            <span className="text-xs font-semibold tracking-wider text-gray-200 mt-2">
              WhatsApp
            </span>
          </section>
        </div>

        {/** Clipboard Share */}
        <div
          className={
            'w-4/5 mx-auto mt-4 bg-gray-800 flex justify-between items-center h-12 ' +
            'rounded-md'
          }
        >
          <input
            className="bg-gray-800 w-full text-gray-400 text-lg px-1 mx-3 outline-none"
            value={shareLink.link}
            readOnly
          />
          <span
            className={
              'text-blue-600 hover:text-blue-500 font-semibold text-xl ' +
              'tracking-wide ml-2 mr-4 cursor-pointer'
            }
            onClick={copyClickHandler}
          >
            copy
          </span>
        </div>
      </div>
    </Aux>
  );
};

export default ShareLinkModal;
