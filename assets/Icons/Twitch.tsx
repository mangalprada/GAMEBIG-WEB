import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const Twitch: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        width={size}
        height={size}
        style={{ margin: 10 }}
        viewBox="0 0 480 512"
        fill="none"
      >
        <path
          d="M32 0L0 96V448H128V512H192L256 448H352L480 311.68V0H32ZM448 288L358.4 384H244.928L176 434.144V384H64V32H448V288Z"
          fill="#673AB7"
        />
        <path d="M256 128H224V256H256V128Z" fill="#673AB7" />
        <path d="M352 128H320V256H352V128Z" fill="#673AB7" />
      </svg>
    </div>
  );
};

export default Twitch;
