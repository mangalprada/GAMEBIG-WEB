import { FC, ReactElement } from 'react';

type Props = {
  content: string | ReactElement;
};

const TournamentCardAvatar: FC<Props> = ({ content }: Props) => {
  return (
    <div className="flex justify-center w-10 h-10 bg-indigo-600 rounded-full items-center">
      <span className="self-center text-xl font-bold tracking-wide text-gray-900 font-sans">
        {content}
      </span>
    </div>
  );
};

export default TournamentCardAvatar;
