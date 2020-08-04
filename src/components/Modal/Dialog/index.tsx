import * as React from 'react';

import Button from '../../Button';

import { ModalWithOpenStaticModalFn } from '../types';
import createOpenStaticModal from '../createOpenStaticModal';

import { QuickDialogProps } from './type';
import RawDialog from './RawDialog';

export type QuickDialogInterface = ModalWithOpenStaticModalFn<QuickDialogProps>;

const initialState = {
  isConfirmLoading: false,
  isCancelLoading: false,
};

const Dialog: QuickDialogInterface = ({
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
    <RawDialog {...restProps} onClose={onClose}>
      <RawDialog.Header isCloseHidden={isCloseHidden} onClickClose={onClose}>
        {title}
      </RawDialog.Header>
      <RawDialog.Content>{children}</RawDialog.Content>
      <RawDialog.Actions>{localActions}</RawDialog.Actions>
    </RawDialog>
  );
};

Dialog.open = createOpenStaticModal(Dialog);

export default Dialog;
