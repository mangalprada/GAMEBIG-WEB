import Aux from 'hoc/Auxiliary/Auxiliary';
import { FC } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import FixedButton from '../Buttons/FixedButton';

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
          'px-auto h-[500px] w-11/12 md:w-2/3 fixed inset-0 bg-gray-900 ' +
          'm-auto z-20 overflow-y-auto rounded-md'
        }
      >
        {closeModal ? (
          <div className="flex flex-row-reverse mr-5 mt-3">
            <FixedButton name="Close" onClick={closeModal} isDangerous />
          </div>
        ) : null}
        {children}
      </div>
    </Aux>
  );
};

export default Modal;
