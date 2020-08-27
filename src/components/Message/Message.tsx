import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createOpenStaticOpenableElementFn } from '../../utils/staticOpenableElement';
import createUseAutoPortalContainer from '../../hooks/createUseAutoPortalContainer';
import useAutoRef from '../../hooks/useAutoRef';

import { IconByIntent } from '../Icon';

import { MessageProps } from './type';
import {
  messageContainerVanillaStyle,
  messageWrapperStyle,
  Message as StyledMessage,
  getIconStyle,
} from './style';

const useAutoPortalContainer = createUseAutoPortalContainer({
  maxChildrenCount: 5,
  onCreatingContainer() {
    const container = document.createElement('div');
    container.className = messageContainerVanillaStyle;
    document.body.appendChild(container);
    return container;
  },
});

export interface MessageInterface extends React.SFC<MessageProps> {
  info: (initialState: MessageProps) => void;
  success: (initialState: MessageProps) => void;
  warn: (initialState: MessageProps) => void;
  error: (initialState: MessageProps) => void;
}

const Message: MessageInterface = ({
  isOpen,
  duration = 3000,
  intent = 'info',
  children,
  onClose,
  ...restProps
}) => {
  const Icon = IconByIntent[intent];

  const { container, onClose: _onClose } = useAutoPortalContainer({
    isOpen,
    onClose,
  });
  const onCloseRef = useAutoRef(_onClose);

  React.useEffect(() => {
    if (isOpen) {
      const timerId = setTimeout(() => {
        onCloseRef.current?.();
        // use current duration
      }, duration);
      return () => {
        clearTimeout(timerId);
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen || !container) {
    return null;
  }

  return ReactDOM.createPortal(
    <div css={messageWrapperStyle}>
      <StyledMessage {...restProps}>
        <Icon css={getIconStyle({ intent })} />
        <span>{children}</span>
      </StyledMessage>
    </div>,
    container
  );
};

Message.info = createOpenStaticOpenableElementFn(Message, {
  intent: 'info',
});
Message.success = createOpenStaticOpenableElementFn(Message, {
  intent: 'success',
});
Message.warn = createOpenStaticOpenableElementFn(Message, {
  intent: 'warning',
});
Message.error = createOpenStaticOpenableElementFn(Message, {
  intent: 'danger',
});

export default Message;
