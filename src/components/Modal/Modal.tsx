import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalProps, ModalWithOpenStaticModalFn } from './types';
import { Modal as StyledModal, ModalWrapper, Backdrop } from './style';

import { useModalManager } from './useModalManager';
import createOpenStaticModal from './createOpenStaticModal';

export type ModalInterface = ModalWithOpenStaticModalFn<ModalProps>;

const Modal: ModalInterface = ({
  isOpen,
  shouldCloseWhenPressESC = true,
  shouldCloseWhenClickBackdrop = true,
  onClose,
  children,
  ...restProps
}) => {
  const modalElementRef = React.useRef<HTMLDivElement>(null);
  const { style } = useModalManager({ isOpen, modalElementRef });
  const wrapperProps = React.useMemo(() => ({ style }), [style]);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!modalElementRef.current?.contains(event.target as HTMLDivElement)) {
        onClose?.();
      }
    },
    [onClose]
  );

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 27) {
        onClose?.();
      }
    },
    [onClose]
  );

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalWrapper
      {...wrapperProps}
      onClick={shouldCloseWhenClickBackdrop ? onClick : undefined}
      onKeyDown={shouldCloseWhenPressESC ? onKeyDown : undefined}
    >
      <Backdrop tabIndex={-1} />
      <StyledModal tabIndex={-1} {...restProps} ref={modalElementRef}>
        {children}
      </StyledModal>
    </ModalWrapper>,
    document.body
  );
};

Modal.open = createOpenStaticModal(Modal);

export default Modal;
