import { FC } from 'react';

type Props = {
  size: number;
  onClick?: () => void;
};

const Icon: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      onClick={onClick}
      className="cursor-pointer fill-current hover:text-indigo-600 text-gray-600"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4z" />
    </svg>
  );
};

export default Icon;
