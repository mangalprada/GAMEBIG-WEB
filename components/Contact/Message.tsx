interface Props {
  isOwner: boolean;
}

export default function Message({ isOwner }: Props) {
  const flexDir = isOwner ? 'flex-end' : 'flex-start';
  const bgColor = isOwner ? '#9FFF97' : '#DEDEDE';

  return (
    <div className="w-full flex" style={{ justifyContent: flexDir }}>
      <div
        className="rounded px-4 py-2 my-2 text-gray-700 relative"
        style={{ backgroundColor: bgColor }}
      >
        <span className="block text-gray-500">master_lionel</span>
        <span className="block font-medium text-black">
          how are you? Is everything ok
        </span>
        <span className="block text-xs text-gray-500 text-left">10:32pm</span>
      </div>
    </div>
  );
}
