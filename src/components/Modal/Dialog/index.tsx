import * as React from 'react';

import { createCommonStyledIcon } from '../../Icon/style';
import { ReactComponent as OriginalCloseIcon } from '../../../resources/svgs/close.svg';

import { ModalProps } from '../types';
import Modal from '../Modal';

import {
  Header as StyledHeader,
  Content,
  Actions,
  CloseButton,
  dialogStyle,
  titleStyle,
} from './style';

const CloseIcon = createCommonStyledIcon(OriginalCloseIcon);

const Header: React.FC<
  {
    isCloseHidden?: boolean;
    onClickClose?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ isCloseHidden, onClickClose, children, ...restProps }) => (
  <StyledHeader {...restProps}>
    <div css={titleStyle}>{children}</div>
    {!isCloseHidden && (
      <CloseButton onClick={onClickClose}>
        <CloseIcon />
      </CloseButton>
    )}
  </StyledHeader>
);

interface Dialog extends React.FC<ModalProps> {
  Header: typeof Header;
  Content: typeof Content;
  Actions: typeof Actions;
}

const Dialog: Dialog = ({ children, ...restProps }) => {
  return (
    <Modal {...restProps} css={dialogStyle}>
      {children}
    </Modal>
  );
};

Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Actions = Actions;

export default Dialog;
