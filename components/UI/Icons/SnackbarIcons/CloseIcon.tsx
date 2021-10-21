import { FC } from 'react';

type Props = {
  size: number;
};

const CloseIcon: FC<Props> = ({ size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      className="fill-current text-gray-100"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d={
          'M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 ' +
          '7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 ' +
          '0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 ' +
          '1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 ' +
          '1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 ' +
          '12l4.89-4.89c.38-.38.38-1.02 0-1.4z'
        }
      />
    </svg>
  );
};

export default CloseIcon;
