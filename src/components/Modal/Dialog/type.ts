import { ModalProps } from '../types';

export interface QuickDialogProps extends ModalProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  isCloseHidden?: boolean;
  onCancel?: () => Promise<unknown> | unknown;
  onConfirm?: () => Promise<unknown> | unknown;
}
