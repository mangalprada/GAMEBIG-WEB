type Props = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  closeBackdrop?: () => void;
};

export default function Backdrop({ children, isOpen }: Props) {
  if (!isOpen) return null;
  return (
    <div
      className={
        'flex flex-col justify-end items-center sm:justify-center ' +
        'fixed w-screen h-screen inset-0 bg-black z-10'
      }
    >
      {children}
    </div>
  );
}
