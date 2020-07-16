import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalProps } from './types';

import ModalWindow from './ModalWindow';

import { useModalManager } from './useModalManager';

const Modal: React.FC<ModalProps> = ({ isVisible, children, ...restProps }) => {
  const style = useModalManager(isVisible);
  const wrapperProps = React.useMemo(() => ({ style }), [style]);

  if (!isVisible) {
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
