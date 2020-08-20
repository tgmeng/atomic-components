export type SVGRComponent = React.FC<React.SVGAttributes<SVGElement>>;

export type Intent = 'info' | 'success' | 'danger' | 'warning';

export interface OpenableProps {
  isOpen: boolean;
  onClose?: () => void;
}
