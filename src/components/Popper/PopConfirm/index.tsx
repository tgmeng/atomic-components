import * as React from 'react';
import { createStyledHTMLComponent } from '../../../utils/component';

import { Button } from '../../Button';
import { Popper } from '../Popper';

import { PopConfirmProps } from './type';
import { actionsStyle, buttonStyle, contentStyle, messageStyle } from './style';

const initialState = {
  isConfirmLoading: false,
  isCancelLoading: false,
};

export const Content = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  contentStyle
);

export const Message = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  messageStyle
);

export const Actions = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  actionsStyle
);

export const PopConfirm: React.FC<PopConfirmProps> = ({
  title,
  placement = 'top',
  trigger = 'click',
  onConfirm,
  onCancel,
  children,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, update] = React.useState(initialState);

  return (
    <Popper
      {...restProps}
      isOpen={isOpen}
      placement={placement}
      trigger={trigger}
      content={
        <Content>
          <Message>{title}</Message>
          <Actions>
            <Button
              className={buttonStyle}
              size="small"
              loading={state.isCancelLoading}
              onClick={() => {
                update((prevState) => ({
                  ...prevState,
                  isCancelLoading: true,
                }));
                Promise.resolve(onCancel?.())
                  .then(() => setIsOpen(false))
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
              className={buttonStyle}
              variant="primary"
              size="small"
              loading={state.isConfirmLoading}
              onClick={() => {
                update((prevState) => ({
                  ...prevState,
                  isConfirmLoading: true,
                }));
                Promise.resolve(onConfirm?.())
                  .then(() => setIsOpen(false))
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
          </Actions>
        </Content>
      }
      onOpenChange={(value) => setIsOpen(value)}
    >
      {children}
    </Popper>
  );
};
