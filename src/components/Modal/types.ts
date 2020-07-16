export interface ModalProps {
  isVisible: boolean;
}

export type ModalDynamicStyle = Pick<React.CSSProperties, 'zIndex' | 'opacity'>;