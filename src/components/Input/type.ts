export type Size = 'small' | 'normal' | 'large';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
  size?: Size;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isClearable?: boolean;
}
