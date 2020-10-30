export type SVGRComponent = React.FC<React.SVGAttributes<SVGElement>>;

export type Intent = 'info' | 'success' | 'danger' | 'warning';
export type Size = 'small' | 'normal' | 'large';

export interface OpenableProps {
  isOpen: boolean;
  onClose?: () => void;
}

export interface AsProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements;
}
