import { ChangeEvent } from 'react';

export type InputProps = {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  className: string;
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};
