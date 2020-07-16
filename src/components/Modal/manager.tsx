import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalDynamicStyle } from './types';
import Overlay from './Overlay';

export default class ModalManager<
  T extends React.Dispatch<any> = React.Dispatch<ModalDynamicStyle>
> {
  private stack: T[] = [];

  private lastOverflow = '';

  private overlayContainer: HTMLDivElement | null = null;

  private opacityStep = 1 / 5;

  baseZIndex = 1000;

  getZIndex(index: number): number {
    return this.baseZIndex + (index + 1) * 2 - 1;
  }

  getOpacity(index: number): number {
    return 1 - Math.max(this.stack.length - 1 - index, 0) * this.opacityStep;
  }

  updateModals(): void {
    this.stack.forEach((update, index) => {
      update({
        opacity: this.getOpacity(index),
        zIndex: this.getZIndex(index),
      });
    });
  }

  updateOverlay(): void {
    if (this.stack.length === 0) {
      // un-mount overlay
      if (this.overlayContainer) {
        ReactDOM.unmountComponentAtNode(this.overlayContainer);
        this.overlayContainer.parentNode?.removeChild(this.overlayContainer);
      }
      this.overlayContainer = null;

      document.body.style.overflow = this.lastOverflow;
      this.lastOverflow = '';
      return;
    }

    if (!this.overlayContainer) {
      // mount overlay
      this.overlayContainer = document.createElement('div');

      this.lastOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    ReactDOM.render(
      ReactDOM.createPortal(
        <Overlay
          style={{ zIndex: this.getZIndex(this.stack.length - 1) - 1 }}
        />,
        document.body
      ),
      this.overlayContainer
    );
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
