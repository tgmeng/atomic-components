import * as React from 'react';
import { createPortal } from 'react-dom';
import { FC, useEffect } from 'react';
import clsx from 'clsx';

import { createOpenStaticOpenableElementFn } from '../../utils/staticOpenableElement';
import { createUseAutoPortalContainer } from '../../hooks/createUseAutoPortalContainer';
import { useAutoRef } from '../../hooks/useAutoRef';

import { IconByIntent } from '../Icon';

import { MessageProps } from './types';
import {
  messageContainerVanillaStyle,
  messageWrapperStyle,
  messageStyle,
  getIconStyle,
} from './styles';

const useAutoPortalContainer = createUseAutoPortalContainer({
  maxChildrenCount: 5,
  onCreatingContainer() {
    const container = document.createElement('div');
    container.className = messageContainerVanillaStyle;
    document.body.appendChild(container);
    return container;
  },
});

export interface MessageInterface extends FC<MessageProps> {
  info: (initialState: MessageProps) => void;
  success: (initialState: MessageProps) => void;
  warn: (initialState: MessageProps) => void;
  error: (initialState: MessageProps) => void;
}

const Message: MessageInterface = ({
  className,
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

  useEffect(() => {
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

  return createPortal(
    <div className={messageWrapperStyle}>
      <div {...restProps} className={clsx(messageStyle, className)}>
        <Icon className={getIconStyle({ intent })} />
        <span>{children}</span>
      </div>
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

export { Message };
