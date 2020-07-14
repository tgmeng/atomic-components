import * as React from 'react';

import { Modal as StyledModal, ModalWrapper } from './style';

export interface ModalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  wrapperProps: React.HTMLAttributes<HTMLDivElement>;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  wrapperProps,
  children,
  ...restProps
}) => {
  return (
    <ModalWrapper {...wrapperProps}>
      <StyledModal {...restProps}>{children}</StyledModal>
    </ModalWrapper>
  );
};

export default ModalWindow;
