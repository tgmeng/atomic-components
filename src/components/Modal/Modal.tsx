import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createOpenStaticOpenableElementFn } from '../../utils/staticOpenableElement';
import { createStyledHTMLComponent } from '../../utils/component';

import { ModalProps, ModalWithOpenStaticModalFn } from './types';
import { backdropStyle, modalStyle, modalWrapperStyle } from './styles';

import { useModalManager } from './useModalManager';

export type ModalInterface = ModalWithOpenStaticModalFn<ModalProps>;

export const ModalWrapper = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  modalWrapperStyle
);

export const Backdrop = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  backdropStyle
);

export const ModalContainer = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  modalStyle
);

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
      <ModalContainer tabIndex={-1} {...restProps} ref={modalElementRef}>
        {children}
      </ModalContainer>
    </ModalWrapper>,
    document.body
  );
};

Modal.open = createOpenStaticOpenableElementFn(Modal);

export { Modal };
