export type ButtonProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLButtonElement>;
};
