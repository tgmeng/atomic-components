import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { OpenableProps } from '../types';

export interface StaticOpenableElement<P> {
  update(props: Partial<React.PropsWithChildren<P>>): void;
  close(): void;
}

export interface OpenStaticOpenableElementFn<P> {
  (initialState?: Partial<React.PropsWithChildren<P>>): StaticOpenableElement<
    P
  >;
}

export function createStaticOpenableElement<P extends OpenableProps>(
  renderElement: (state: P) => React.ReactElement<P>,
  initialState?: Partial<P>
): StaticOpenableElement<P> {
  let mountNode: HTMLDivElement | null = document.createElement('div');

  let state = {
    ...initialState,
    isOpen: true,
  } as P;

  function render(props: P) {
    if (mountNode) {
      ReactDOM.render(
        renderElement({
          ...props,
          onClose: () => {
            props.onClose?.();
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            close();
          },
        }),
        mountNode
      );
    }
  }

  function update(props: Partial<P>) {
    state = {
      ...state,
      ...props,
    };

    render(state);
  }

  function destroy() {
    requestAnimationFrame(() => {
      if (mountNode) {
        ReactDOM.unmountComponentAtNode(mountNode as HTMLDivElement);
        mountNode = null;
      }
    });
  }

  function close() {
    update({ isOpen: false } as P);
    destroy();
  }

  render(state);

  return {
    update,
    close,
  };
}

export function createOpenStaticOpenableElementFn<P extends OpenableProps>(
  Component: React.ComponentType<P>,
  initialState?: Partial<React.PropsWithChildren<P>>
): OpenStaticOpenableElementFn<P> {
  return function openStaticOpenableElement(_initialState) {
    return createStaticOpenableElement((props) => <Component {...props} />, {
      ...initialState,
      ..._initialState,
    });
  };
}
