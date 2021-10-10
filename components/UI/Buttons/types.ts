export type ButtonProps = {
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClickHandler?: () => void;
  isDisabled?: boolean;
  isDangerous?: boolean;
};
