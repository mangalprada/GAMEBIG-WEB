import { FC, ReactNode } from 'react';

type Props = {
  content: string;
  children: ReactNode;
};

const EventCardRowItem: FC<Props> = ({ content, children }: Props) => {
  return (
    <div className="flex flex-row sm:px-5 sm:py-3 p-3 sm:w-5/12 w-full">
      {children}
      <span className="text-gray-400 text-lg font-sans font-semibold ml-3">
        {content}
      </span>
    </div>
  );
};

export default EventCardRowItem;
