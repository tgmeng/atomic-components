import { BasePopperProps } from '../types';

export interface PopConfirmProps extends BasePopperProps {
  title: React.ReactNode;
  onCancel?: () => Promise<any> | void;
  onConfirm?: () => Promise<any> | void;
}
