export type ButtonProps = {
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  isDisabled?: boolean;
  isDangerous?: boolean;
};
