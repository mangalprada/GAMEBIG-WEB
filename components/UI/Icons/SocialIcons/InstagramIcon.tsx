import React, { FC } from 'react';

type Props = {
  size: number;
  onClick: () => void;
};

const Instagram: FC<Props> = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <svg
        width={size}
        height={size}
        style={{ margin: 10 }}
        viewBox="0 0 96 96"
        fill="none"
      >
        <path
          d="M68.034 83.98L28.034 84.018C19.234 84.026 12.028 76.834 12.018 68.034L11.98 28.034C11.972 19.234 19.164 12.028 27.964 12.018L67.964 11.98C76.764 11.972 83.97 19.164 83.98 27.964L84.018 67.964C84.028 76.766 76.834 83.972 68.034 83.98Z"
          fill="url(#paint0_radial)"
        />
        <path
          d="M68.034 83.98L28.034 84.018C19.234 84.026 12.028 76.834 12.018 68.034L11.98 28.034C11.972 19.234 19.164 12.028 27.964 12.018L67.964 11.98C76.764 11.972 83.97 19.164 83.98 27.964L84.018 67.964C84.028 76.766 76.834 83.972 68.034 83.98Z"
          fill="url(#paint1_radial)"
        />
        <path
          d="M48 62C40.282 62 34 55.72 34 48C34 40.28 40.282 34 48 34C55.718 34 62 40.28 62 48C62 55.72 55.718 62 48 62ZM48 38C42.486 38 38 42.486 38 48C38 53.514 42.486 58 48 58C53.514 58 58 53.514 58 48C58 42.486 53.514 38 48 38Z"
          fill="white"
        />
        <path
          d="M63 36C64.6569 36 66 34.6569 66 33C66 31.3431 64.6569 30 63 30C61.3431 30 60 31.3431 60 33C60 34.6569 61.3431 36 63 36Z"
          fill="white"
        />
        <path
          d="M60 74H36C28.282 74 22 67.72 22 60V36C22 28.28 28.282 22 36 22H60C67.718 22 74 28.28 74 36V60C74 67.72 67.718 74 60 74ZM36 26C30.486 26 26 30.486 26 36V60C26 65.514 30.486 70 36 70H60C65.514 70 70 65.514 70 60V36C70 30.486 65.514 26 60 26H36Z"
          fill="white"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(38.76 84.07) scale(89.798)"
          >
            <stop stopColor="#FFDD55" />
            <stop offset="0.328" stopColor="#FF543F" />
            <stop offset="0.348" stopColor="#FC5245" />
            <stop offset="0.504" stopColor="#E64771" />
            <stop offset="0.643" stopColor="#D53E91" />
            <stop offset="0.761" stopColor="#CC39A4" />
            <stop offset="0.841" stopColor="#C837AB" />
          </radialGradient>
          <radialGradient
            id="paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(23.572 11.0806) scale(59.626 39.7288)"
          >
            <stop stopColor="#4168C9" />
            <stop offset="0.999" stopColor="#4168C9" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Instagram;
