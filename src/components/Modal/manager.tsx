import * as React from 'react';

import { ModalManagedProps } from './types';

export interface ModalData {
  id: number;
  modalElementRef: React.RefObject<HTMLDivElement>;
  updateManagedProps: React.Dispatch<React.SetStateAction<ModalManagedProps>>;
}

export interface ModalManagerStackItem {
  id: number;
  lastActiveElement: Element | null;
}

export default class ModalManager {
  private id = 0;

  private modalMap = new Map<number, ModalData>();

  private stack: ModalManagerStackItem[] = [];

  private lastOverflow = '';

  baseZIndex = 1000;

  constructor(options?: { zIndex: number }) {
    if (options?.zIndex) {
      this.baseZIndex = options.zIndex;
    }
  }

  getZIndex(index: number): number {
    return this.baseZIndex + index;
  }

  updateModals(): void {
    this.stack.forEach(({ id }, index) => {
      const modalData = this.modalMap.get(id);
      modalData?.updateManagedProps((state) => ({
        ...state,
        style: {
          zIndex: this.getZIndex(index),
        },
      }));
    });
  }

  updateDocumentBodyOverflow(state: {
    isEntering: boolean;
    isLeaving: boolean;
  }) {
    if (state.isEntering) {
      this.lastOverflow = getComputedStyle(document.body, null).overflow;
      document.body.style.overflow = 'hidden';
    } else if (state.isLeaving) {
      document.body.style.overflow = this.lastOverflow;
      this.lastOverflow = '';
    }
  }

  update(newStack: ModalManagerStackItem[]) {
    const state = {
      isEntering: newStack.length > 0 && this.stack.length === 0,
      isLeaving: newStack.length === 0 && this.stack.length > 0,
    };

    this.stack = newStack;

    this.updateModals();
    this.updateDocumentBodyOverflow(state);
  }

  register(data: Omit<ModalData, 'id'>): number {
    this.id += 1;
    const modalData = {
      ...data,
      id: this.id,
    };
    this.modalMap.set(this.id, modalData);
    return this.id;
  }

  unregister(id: number): boolean {
    this.removeFromStack(id);
    return this.modalMap.delete(id);
  }

  pushToStack(id: number): void {
    if (!this.modalMap.get(id)) {
      return;
    }

    let newStack = this.stack;
    if (newStack.find(({ id: _id }) => _id === id)) {
      newStack = newStack.filter(({ id: _id }) => _id !== id);
    }

    // save last active element
    const stackItem = { id, lastActiveElement: document.activeElement };
    this.modalMap.get(id)?.modalElementRef.current?.focus();

    this.update([...newStack, stackItem]);
  }

  removeFromStack(id: number): void {
    if (!this.modalMap.get(id)) {
      return;
    }

    // restore last active element
    (this.stack.find(({ id: _id }) => _id === id)
      ?.lastActiveElement as HTMLElement)?.focus();

    const newStack = this.stack.filter(({ id: _id }) => _id !== id);

    this.update(newStack);
  }
}
