import * as React from 'react';

import { usePrevious } from '../../hooks/usePrevious';

import { ModalManagedProps, ModalProps } from './types';
import ModalManagerModel from './manager';

/**
 * Modal manager singleton
 */
let manager = ModalManagerModel.create({
  zIndex: 1000,
});

export function useModalManager({
  isOpen,
  modalElementRef,
}: Pick<ModalProps, 'isOpen'> & {
  modalElementRef: React.RefObject<HTMLDivElement>;
}): ModalManagedProps {
  const idRef = React.useRef<number>(0);
  const prevIsOpen = usePrevious(isOpen);
  const [managedProps, updateManagedProps] = React.useState<ModalManagedProps>(
    () => ({
      style: {
        zIndex: manager.baseZIndex,
      },
    })
  );

  React.useEffect(() => {
    let id: number;
    [id, manager] = ModalManagerModel.register(manager, {
      modalElementRef,
      updateManagedProps,
    });

    idRef.current = id;
    return () => {
      manager = ModalManagerModel.unregister(manager, id);
      idRef.current = 0;
    };
  }, [modalElementRef]);

  React.useEffect(() => {
    if (!idRef.current) {
      return;
    }
    if (isOpen) {
      manager = ModalManagerModel.pushToStack(manager, idRef.current);
    } else if (prevIsOpen) {
      // check if the modal was opened before
      manager = ModalManagerModel.removeFromStack(manager, idRef.current);
    }
  }, [isOpen, prevIsOpen]);

  return managedProps;
}
