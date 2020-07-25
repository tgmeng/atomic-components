export type Size = 'small' | 'normal' | 'large';
export type Variant = 'default' | 'primary' | 'dashed' | 'link';
export type Intent = 'default' | 'success' | 'warning' | 'danger';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  intent?: Intent;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
};
