export interface ModalProps {
  isOpen: boolean;
}

export type ModalDynamicStyle = Pick<React.CSSProperties, 'zIndex' | 'opacity'>;