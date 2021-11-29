import { MouseEvent } from 'react';
export type ButtonProps = {
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e?: MouseEvent) => void | Promise<void>;
  isDisabled?: boolean;
  isDangerous?: boolean;
};
