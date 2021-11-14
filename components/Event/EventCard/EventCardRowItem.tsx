import { FC, ReactNode } from 'react';

type Props = {
  content: string;
  children: ReactNode;
};

const EventCardRowItem: FC<Props> = ({ content, children }: Props) => {
  return (
    <div className="flex flex-row sm:w-2/3 w-4/5">
      {children}
      <span className="text-gray-400 text-lg font-sans font-semibold ml-3">
        {content}
      </span>
    </div>
  );
};

export default EventCardRowItem;
