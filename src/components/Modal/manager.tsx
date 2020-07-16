import * as React from 'react';

import { ModalDynamicStyle } from './types';

export default class ModalManager<
  T extends React.Dispatch<any> = React.Dispatch<ModalDynamicStyle>
> {
  private stack: T[] = [];

  baseZIndex = 1000;

  getZIndex(index: number): number {
    return this.baseZIndex + index;
  }

  updateModals(): void {
    this.stack.forEach((update, index) => {
      update({
        zIndex: this.getZIndex(index),
      });
    });
  }

  update() {
    this.updateModals();
  }

  push(dispatch: T) {
    let neoStack = this.stack;
    if (neoStack.indexOf(dispatch) !== -1) {
      neoStack = this.remove(dispatch);
    }
    this.stack = [...neoStack, dispatch];

    this.update();

    return neoStack;
  }

  remove(dispatch: T) {
    const neoStack = this.stack.filter((update) => update !== dispatch);
    this.stack = neoStack;

    this.update();

    return neoStack;
  }
}
