import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const BackArrow: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="fill-current text-gray-300"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
      </svg>
    </div>
  );
};

export default BackArrow;
