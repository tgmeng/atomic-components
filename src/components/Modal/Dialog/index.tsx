import * as React from 'react';

import { createOpenStaticOpenableElementFn } from '../../../utils/staticOpenableElement';
import { ReactComponent as OriginalCloseIcon } from '../../../resources/svgs/close.svg';
import {
  createComponentWithPresetProps,
  createStyledHTMLComponent,
} from '../../../utils/component';

import { createCommonStyledIcon } from '../../Icon/style';
import { Button } from '../../Button';

import { Modal } from '../Modal';
import { ModalWithOpenStaticModalFn } from '../types';

import { DialogProps } from './type';
import {
  titleStyle,
  headerStyle,
  closeButtonStyle,
  contentStyle,
  actionsStyle,
  dialogStyle,
} from './style';

const Container = createComponentWithPresetProps(Modal, {
  className: dialogStyle,
});

const CloseIcon = createCommonStyledIcon(OriginalCloseIcon);

const StyledHeader = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  headerStyle
);
const Content = createStyledHTMLComponent<HTMLDivElement>('div', contentStyle);
const Actions = createStyledHTMLComponent<HTMLDivElement>('div', actionsStyle);

const Header: React.FC<
  {
    isCloseHidden?: boolean;
    onClickClose?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ isCloseHidden, onClickClose, children, ...restProps }) => (
  <StyledHeader {...restProps}>
    <div className={titleStyle}>{children}</div>
    {!isCloseHidden && (
      <button type="button" className={closeButtonStyle} onClick={onClickClose}>
        <CloseIcon />
      </button>
    )}
  </StyledHeader>
);

export type DialogInterface = ModalWithOpenStaticModalFn<DialogProps> & {
  Container: typeof Container;
  Header: typeof Header;
  Content: typeof Content;
  Actions: typeof Actions;
};

const initialState = {
  isConfirmLoading: false,
  isCancelLoading: false,
};

const Dialog: DialogInterface = ({
  title,
  actions,
  children,
  isCloseHidden,
  onClose,
  onConfirm,
  onCancel,
  ...restProps
}) => {
  const [state, update] = React.useState(initialState);

  const localActions = actions ?? (
    <>
      <Button
        loading={state.isCancelLoading}
        onClick={() => {
          update((prevState) => ({
            ...prevState,
            isCancelLoading: true,
          }));
          Promise.resolve(onCancel?.())
            .then(() => onClose?.())
            .finally(() =>
              update((prevState) => ({
                ...prevState,
                isCancelLoading: false,
              }))
            );
        }}
      >
        取消
      </Button>
      <Button
        variant="primary"
        loading={state.isConfirmLoading}
        onClick={() => {
          update((prevState) => ({
            ...prevState,
            isConfirmLoading: true,
          }));
          Promise.resolve(onConfirm?.())
            .then(() => onClose?.())
            .finally(() =>
              update((prevState) => ({
                ...prevState,
                isConfirmLoading: false,
              }))
            );
        }}
      >
        确认
      </Button>
    </>
  );

  return (
    <Container {...restProps} onClose={onClose}>
      <Header isCloseHidden={isCloseHidden} onClickClose={onClose}>
        {title}
      </Header>
      <Content>{children}</Content>
      <Actions>{localActions}</Actions>
    </Container>
  );
};

Dialog.Container = Container;
Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Actions = Actions;

Dialog.open = createOpenStaticOpenableElementFn(Dialog);

export { Dialog };
