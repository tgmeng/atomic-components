import * as React from 'react';

import { OpenableProps } from '../types';

import useUpdate from './useUpdate';
import useAutoRef from './useAutoRef';

export interface CreateComponentStackOptions {
  maxChildrenCount?: number;
  onCreatingContainer(): HTMLElement;
}

export type useAutoPortalContainerOptions = OpenableProps;

export interface RefItem {
  onCloseRef?: React.MutableRefObject<OpenableProps['onClose']>;
  update(): void;
}

export default function createUseAutoPortalContainer({
  maxChildrenCount = 5,
  onCreatingContainer,
}: CreateComponentStackOptions) {
  let container: HTMLElement | null = null;

  let id = 0;

  const refMap: Map<number, RefItem> = new Map();

  function unref(_id: number) {
    const item = refMap.get(_id);
    if (item) {
      item.onCloseRef?.current?.();
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

    if (refMap.size >= maxChildrenCount) {
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

  return function useAutoPortalContainer({
    isOpen = true,
    onClose,
  }: useAutoPortalContainerOptions) {
    const idRef = React.useRef(0);
    const update = useUpdate();

    const onCloseRef = useAutoRef(onClose);
    const _onClose = React.useCallback(() => unref(idRef.current), []);

    React.useEffect(() => {
      if (isOpen) {
        idRef.current = ref({
          onCloseRef,
          update,
        });
        return () => {
          unref(idRef.current);
        };
      }
      return undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return {
      container,
      onClose: _onClose,
    };
  };
}
