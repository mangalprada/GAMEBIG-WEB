import Aux from 'hoc/Auxiliary/Auxiliary';
import { FC } from 'react';
import Backdrop from '../Backdrop/Backdrop';

type Props = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  closeModal?: () => void;
};

const Modal: FC<Props> = ({ children, isOpen, closeModal }: Props) => {
  if (!isOpen) return null;
  return (
    <Aux>
      <Backdrop isOpen={isOpen} closeBackdrop={closeModal} />
      <div
        className={
          'px-auto h-[580px] w-11/12 md:w-5/6 fixed inset-0 bg-gray-800 ' +
          'm-auto z-20 overflow-y-auto rounded-md'
        }
      >
        {closeModal ? (
          <div className="flex flex-row-reverse mr-5 mt-3">
            <div
              className="px-3 py-2 bg-slate-700 rounded-md cursor-pointer"
              onClick={closeModal}
            >
              <span className="text-gray-50 font-sans text-base ">Close</span>
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </Aux>
  );
};

export default Modal;
