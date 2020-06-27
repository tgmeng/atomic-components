export type Size = 'small' | 'normal' | 'large';
export type Variant = 'default' | 'primary' | 'dashed' | 'link';
export type Indent = 'default' | 'success' | 'warning' | 'danger';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  indent?: Indent;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
};
