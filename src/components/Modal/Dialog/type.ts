import { ModalProps } from '../types';

export interface QuickDialogProps extends ModalProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  isCloseHidden?: boolean;
  onCancel?: () => Promise<any> | void;
  onConfirm?: () => Promise<any> | void;
}
