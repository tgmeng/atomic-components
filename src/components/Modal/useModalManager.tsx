import * as React from 'react';

import { ModalDynamicStyle } from './types';
import ModalManager from './manager';

/**
 * Modal manager singleton
 */
const manager = new ModalManager();

export function useModalManager(isVisible: boolean): ModalDynamicStyle {
  const [style, update] = React.useState<ModalDynamicStyle>(() => ({
    zIndex: manager.baseZIndex,
    opacity: 0,
  }));

  React.useEffect(() => {
    if (isVisible) {
      manager.push(update);
    } else {
      manager.remove(update);
    }
  }, [isVisible]);

  React.useEffect(() => {
    return () => {
      manager.remove(update);
    };
  }, []);

  return style;
}
