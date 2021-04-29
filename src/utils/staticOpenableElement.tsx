import * as React from 'react';
import { ComponentType, PropsWithChildren, ReactElement } from 'react';
import * as ReactDOM from 'react-dom';

import { OpenableProps } from '../types';

export interface StaticOpenableElement<P> {
  update(props: Partial<PropsWithChildren<P>>): void;
  close(): void;
}

export interface OpenStaticOpenableElementFn<P> {
  (initialState?: Partial<PropsWithChildren<P>>): StaticOpenableElement<P>;
}

export function createStaticOpenableElement<P extends OpenableProps>(
  renderElement: (state: P) => ReactElement<P>,
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
  Component: ComponentType<P>,
  initialState?: Partial<PropsWithChildren<P>>
): OpenStaticOpenableElementFn<P> {
  return function openStaticOpenableElement(state) {
    return createStaticOpenableElement(
      (props) => <Component {...((props as OpenableProps) as P)} />,
      {
        ...initialState,
        ...state,
      }
    );
  };
}
