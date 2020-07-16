import * as React from 'react';

import { ModalDynamicStyle } from './types';
import ModalManager from './manager';

/**
 * Modal manager singleton
 */
const manager = new ModalManager();

export function useModalManager(isOpen: boolean): ModalDynamicStyle {
  const [style, update] = React.useState<ModalDynamicStyle>(() => ({
    zIndex: manager.baseZIndex,
    opacity: 0,
  }));

  React.useEffect(() => {
    if (isOpen) {
      manager.push(update);
    } else {
      manager.remove(update);
    }
  }, [isOpen]);

  React.useEffect(() => {
    return () => {
      manager.remove(update);
    };
  }, []);

  return style;
}
