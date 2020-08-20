import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { OpenableProps } from '../types';

import useUpdate from '../hooks/useUpdate';
import usePrevious from '../hooks/usePrevious';

export interface CreateComponentStackOptions {
  onCreatingContainer(): HTMLElement;
}

export interface UpdateFn {
  (): void;
}

export interface AutoPortalProps extends OpenableProps {
  children: React.ReactNode;
}

export default function createAutoPortal(options: CreateComponentStackOptions) {
  let container: HTMLElement | null = null;

  const refSet: Set<UpdateFn> = new Set();

  function ref(update: UpdateFn) {
    if (!refSet.has(update)) {
      refSet.add(update);
    }
    if (refSet.size === 1) {
      container = options.onCreatingContainer();

      update();
    }
  }

  function unref(update: UpdateFn) {
    if (refSet.has(update)) {
      refSet.delete(update);
    }
    if (refSet.size === 0) {
      container?.parentNode?.removeChild(container);
      container = null;
      update();
    }
  }

  return function AutoPortal({
    isOpen = true,
    onClose,
    children,
  }: AutoPortalProps) {
    const update = useUpdate();
    const prevIsOpen = usePrevious(isOpen);

    React.useEffect(() => {
      return () => {
        unref(update);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        ref(update);
      } else if (prevIsOpen) {
        unref(update);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen || !container) {
      return null;
    }

    return ReactDOM.createPortal(children, container);
  };
}
