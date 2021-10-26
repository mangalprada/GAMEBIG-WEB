import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const BackArrow: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M19 12H5"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 19L5 12L12 5"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BackArrow;
