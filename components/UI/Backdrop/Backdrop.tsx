type Props = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  closeBackdrop?: () => void;
};

export default function Backdrop({ children, isOpen, closeBackdrop }: Props) {
  if (!isOpen) return null;
  return (
    <div className="py-20 px-auto fixed inset-0 bg-black z-10 overflow-auto">
      {closeBackdrop ? (
        <div className="flex flex-col items-end">
          <span
            className="p-2 mr-4 md:mr-16 text-md text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg font-sans font-semibold"
            onClick={closeBackdrop}
          >
            Close
          </span>
        </div>
      ) : null}
      {children}
    </div>
  );
}
