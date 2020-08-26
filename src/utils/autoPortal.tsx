import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { OpenableProps } from '../types';

import useUpdate from '../hooks/useUpdate';
import usePrevious from '../hooks/usePrevious';

export interface CreateComponentStackOptions {
  maxCount?: number;
  onCreatingContainer(): HTMLElement;
}

export interface AutoPortalProps extends OpenableProps {
  children: React.ReactNode;
}

export interface RefItem {
  onClose?(): void;
  update(): void;
}

export function createAutoPortal({
  maxCount = 5,
  onCreatingContainer,
}: CreateComponentStackOptions) {
  let container: HTMLElement | null = null;

  let id = 0;

  const refMap: Map<number, RefItem> = new Map();

  function unref(_id: number) {
    const item = refMap.get(_id);
    if (item) {
      item.onClose?.();
      refMap.delete(_id);
    }
    if (refMap.size === 0) {
      container?.parentNode?.removeChild(container);
      container = null;
      item?.update();
    }
  }

  function ref(item: RefItem) {
    id += 1;

    if (refMap.size >= maxCount) {
      const _idToRemove = refMap.keys().next().value;
      unref(_idToRemove);
    }

    refMap.set(id, item);

    if (refMap.size === 1) {
      container = onCreatingContainer();
      item.update();
    }

    return id;
  }

  return function AutoPortal({
    isOpen = true,
    onClose,
    children,
  }: AutoPortalProps) {
    const idRef = React.useRef(0);
    const update = useUpdate();
    const prevIsOpen = usePrevious(isOpen);

    React.useEffect(() => {
      return () => {
        unref(idRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        idRef.current = ref({
          onClose,
          update,
        });
      } else if (prevIsOpen) {
        unref(idRef.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen || !container) {
      return null;
    }

    return ReactDOM.createPortal(children, container);
  };
}
