import { FC } from 'react';

type Props = {
  size: number;
};

const MoreIcon: FC<Props> = ({ size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      className="fill-current text-gray-200"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
};

export default MoreIcon;
