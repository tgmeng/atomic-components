import * as React from 'react';

import Button from '../../Button';

import Dialog from '.';
import { QuickDialogProps } from './type';

const initialState = {
  isConfirmLoading: false,
  isCancelLoading: false,
};

const QuickDialog: React.FC<QuickDialogProps> = ({
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
    <Dialog {...restProps}>
      <Dialog.Header isCloseHidden={isCloseHidden} onClickClose={onClose}>
        {title}
      </Dialog.Header>
      <Dialog.Content>{children}</Dialog.Content>
      <Dialog.Actions>{localActions}</Dialog.Actions>
    </Dialog>
  );
};

export default QuickDialog;
