import { StaticOpenableElement } from 'utils/staticOpenableElement';

export interface ModalProps {
  isOpen: boolean;
  shouldCloseWhenPressESC?: boolean;
  shouldCloseWhenClickBackdrop?: boolean;
  onClose?: () => void;
}

export interface ModalManagedProps {
  style: Pick<React.CSSProperties, 'zIndex'>;
}

export interface OpenStaticModalFn<P> {
  (initialState?: Partial<React.PropsWithChildren<P>>): StaticOpenableElement<P>;
}

export type ModalWithOpenStaticModalFn<P extends ModalProps> = React.FC<P> & {
  open: OpenStaticModalFn<P>;
};
