import { Intent as CommonIntent, Size as CommonSize } from '../../types';

export type Size = CommonSize;
export type Variant = 'default' | 'primary' | 'dashed' | 'link';
export type Intent = CommonIntent;

export type ButtonRef = HTMLButtonElement;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  intent?: Intent;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
};
