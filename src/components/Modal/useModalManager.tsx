import * as React from 'react';

import ModalManager from './manager';

/**
 * Modal manager singleton
 */
const manager = new ModalManager();

export function useModalManager(isVisible: boolean): number {
  const [zIndex, update] = React.useState(manager.baseZIndex);

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

  return zIndex;
}
