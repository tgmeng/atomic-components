import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Overlay from './Overlay';

export default class ModalManager<
  T extends React.Dispatch<any> = React.Dispatch<number>
> {
  private stack: T[] = [];

  private lastBodyOverflow = '';

  private overlayContainer: HTMLDivElement | null = null;

  baseZIndex = 1000;

  getZIndex(index: number): number {
    return this.baseZIndex + (index + 1) * 2 - 1;
  }

  updateModals(): void {
    this.stack.forEach((update, index) => {
      update(this.getZIndex(index));
    });
  }

  updateOverlay(): void {
    if (this.stack.length === 0) {
      if (this.overlayContainer) {
        ReactDOM.unmountComponentAtNode(this.overlayContainer);
        this.overlayContainer.parentNode?.removeChild(this.overlayContainer);
      }

      this.overlayContainer = null;

      document.body.style.overflow = this.lastBodyOverflow;
      this.lastBodyOverflow = '';
    } else {
      if (!this.overlayContainer) {
        this.overlayContainer = document.body.appendChild(
          document.createElement('div')
        );
      }

      if (getComputedStyle(document.body, null).overflow !== 'hidden') {
        this.lastBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }

      ReactDOM.render(
        <Overlay
          style={{ zIndex: this.getZIndex(this.stack.length - 1) - 1 }}
        />,
        this.overlayContainer
      );
    }
  }

  update() {
    this.updateModals();
    this.updateOverlay();
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
