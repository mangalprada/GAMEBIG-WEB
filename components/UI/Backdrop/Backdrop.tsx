import FixedButton from '../Buttons/FixedButton';

type Props = {
  isOpen: boolean;
  closeBackdrop?: () => void;
};

export default function Backdrop({ isOpen, closeBackdrop }: Props) {
  if (!isOpen) return null;
  return (
    <>
      {isOpen ? (
        <div
          onClick={closeBackdrop}
          className="w-screen h-screen fixed inset-0 bg-black/80 blur-lg"
        ></div>
      ) : null}
    </>
  );
}
