export interface ModalProps {
  isOpen: boolean;
  shouldCloseWhenPressESC?: boolean;
  shouldCloseWhenClickBackdrop?: boolean;
  onClose?: () => void;
}

export interface ModalManagedProps {
  style: Pick<React.CSSProperties, 'zIndex'>;
}
