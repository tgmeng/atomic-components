import * as React from 'react';

import { ModalManagedProps, ModalProps } from './types';
import ModalManager from './manager';

/**
 * Modal manager singleton
 */
const manager = new ModalManager();

export function useModalManager({
  isOpen,
  modalElementRef,
}: Pick<ModalProps, 'isOpen'> & {
  modalElementRef: React.RefObject<HTMLDivElement>;
}): ModalManagedProps {
  const idRef = React.useRef<number>(0);
  const [managedProps, updateManagedProps] = React.useState<ModalManagedProps>(
    () => ({
      style: {
        zIndex: manager.baseZIndex,
      },
    })
  );

  React.useEffect(() => {
    const id = manager.register({
      modalElementRef,
      updateManagedProps,
    });
    idRef.current = id;
    return () => {
      manager.unregister(id);
      idRef.current = 0;
    };
  }, [modalElementRef]);

  React.useEffect(() => {
    if (!idRef.current) {
      return;
    }
    if (isOpen) {
      manager.pushToStack(idRef.current);
    } else {
      manager.removeFromStack(idRef.current);
    }
  }, [isOpen]);

  return managedProps;
}
