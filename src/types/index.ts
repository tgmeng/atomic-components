export type SVGRComponent = React.FC<React.SVGAttributes<SVGElement>>;

export type Intent = 'info' | 'success' | 'danger' | 'warning';
export type Size = 'small' | 'normal' | 'large';

export interface OpenableProps {
  isOpen: boolean;
  onClose?: () => void;
}
