import * as React from 'react';
import update from 'immutability-helper';

import { ModalManagedProps } from './types';

export interface ModalData {
  id: number;
  modalElementRef: React.RefObject<HTMLDivElement>;
  updateManagedProps: React.Dispatch<React.SetStateAction<ModalManagedProps>>;
}

export interface ModalStackItem {
  id: number;
  lastActiveElement: Element | null;
}

export interface ModalManager {
  id: number;
  modalMap: Map<number, ModalData>;
  stack: ModalStackItem[];
  lastOverflow: string;
  baseZIndex: number;
}

const ModalManagerModel = {
  create(options: { zIndex: number }): ModalManager {
    return {
      id: 0,
      modalMap: new Map<number, ModalData>(),
      stack: [],
      lastOverflow: '',
      baseZIndex: options.zIndex,
    };
  },

  getZIndex(model: ModalManager, index: number): number {
    return model.baseZIndex + index;
  },

  updateModalsWithEffect(model: ModalManager): void {
    model.stack.forEach(({ id }, index) => {
      const modalData = model.modalMap.get(id);
      modalData?.updateManagedProps((state) => ({
        ...state,
        style: {
          zIndex: this.getZIndex(model, index),
        },
      }));
    });
  },

  updateDocumentBodyOverflowWithEffect(
    model: ModalManager,
    prevModel: ModalManager
  ): ModalManager {
    const state = {
      isEntering: model.stack.length > 0 && prevModel.stack.length === 0,
      isLeaving: model.stack.length === 0 && prevModel.stack.length > 0,
    };

    let lastOverflow;

    if (state.isEntering) {
      lastOverflow = getComputedStyle(document.body, null).overflow;
      document.body.style.overflow = 'hidden';
    } else if (state.isLeaving) {
      document.body.style.overflow = model.lastOverflow;
      lastOverflow = '';
    }

    return lastOverflow !== undefined
      ? update(model, { lastOverflow: { $set: lastOverflow } })
      : model;
  },

  update(model: ModalManager, prevModel: ModalManager): ModalManager {
    this.updateModalsWithEffect(model);
    return this.updateDocumentBodyOverflowWithEffect(model, prevModel);
  },

  register(
    model: ModalManager,
    data: Omit<ModalData, 'id'>
  ): [number, ModalManager] {
    let { id } = model;
    id += 1;
    const modalData = {
      ...data,
      id,
    };
    return [
      id,
      update(model, {
        id: {
          $set: id,
        },
        modalMap: {
          $add: [[id, modalData]],
        },
      }),
    ];
  },

  unregister(model: ModalManager, id: number): ModalManager {
    return this.removeFromStack(
      update(model, {
        modalMap: {
          $remove: [id],
        },
      }),
      id
    );
  },

  pushToStack(model: ModalManager, id: number): ModalManager {
    if (!model.modalMap.get(id)) {
      return model;
    }

    let localModel = model;

    const index = localModel.stack.findIndex(({ id: _id }) => _id === id);
    if (index !== -1) {
      localModel = update(model, {
        stack: {
          $splice: [[index, 1]],
        },
      });
    }

    // save last active element
    const stackItem = { id, lastActiveElement: document.activeElement };
    localModel.modalMap.get(id)?.modalElementRef.current?.focus();

    return this.update(
      update(localModel, {
        stack: {
          $push: [stackItem],
        },
      }),
      model
    );
  },

  removeFromStack(model: ModalManager, id: number): ModalManager {
    if (!model.modalMap.get(id)) {
      return model;
    }

    const index = model.stack.findIndex(({ id: _id }) => _id === id);

    // restore last active element
    (model.stack[index]?.lastActiveElement as HTMLElement)?.focus();

    return this.update(
      update(model, {
        stack: {
          $splice: [[index, 1]],
        },
      }),
      model
    );
  },
};

export default ModalManagerModel;
