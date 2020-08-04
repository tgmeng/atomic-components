import * as React from 'react';

import { createCommonStyledIcon } from '../../Icon/style';
import { ReactComponent as OriginalCloseIcon } from '../../../resources/svgs/close.svg';

import { ModalProps, ModalWithOpenStaticModalFn } from '../types';
import createOpenStaticModal from '../createOpenStaticModal';
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

export type RawDialogInterface = ModalWithOpenStaticModalFn<ModalProps> & {
  Header: typeof Header;
  Content: typeof Content;
  Actions: typeof Actions;
};

const RawDialog: RawDialogInterface = ({ children, ...restProps }) => {
  return (
    <Modal {...restProps} css={dialogStyle}>
      {children}
    </Modal>
  );
};

RawDialog.Header = Header;
RawDialog.Content = Content;
RawDialog.Actions = Actions;

RawDialog.open = createOpenStaticModal(RawDialog);

export default RawDialog;
