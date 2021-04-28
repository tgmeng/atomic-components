import { ModalProps } from '../types';

export interface DialogProps extends ModalProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  isCloseHidden?: boolean;
  onCancel?: () => Promise<any> | void;
  onConfirm?: () => Promise<any> | void;
}
