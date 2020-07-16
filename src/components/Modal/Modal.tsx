import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalProps } from './types';

import ModalWindow from './ModalWindow';

import { useModalManager } from './useModalManager';

const Modal: React.FC<ModalProps> = ({ isOpen, children, ...restProps }) => {
  const style = useModalManager(isOpen);
  const wrapperProps = React.useMemo(() => ({ style }), [style]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalWindow {...restProps} wrapperProps={wrapperProps}>
      {children}
    </ModalWindow>,
    document.body
  );
};

export default Modal;
