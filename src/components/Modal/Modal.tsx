import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalProps } from './types';

import ModalWindow from './ModalWindow';

import { useModalManager } from './useModalManager';

const Modal: React.FC<ModalProps> = ({ isVisible, children, ...restProps }) => {
  const zIndex = useModalManager(isVisible);

  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalWindow {...restProps} wrapperProps={{ style: { zIndex } }}>
      {children}
    </ModalWindow>,
    document.body
  );
};

export default Modal;
