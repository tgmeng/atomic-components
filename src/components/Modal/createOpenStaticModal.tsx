import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ModalProps, StaticModal, OpenStaticModalFn } from './types';

export default function createOpenStaticModal<P extends ModalProps>(
  Component: React.ComponentType<P>
): OpenStaticModalFn<P> {
  return function openStaticModal(initialState): StaticModal<P> {
    let mountNode: HTMLDivElement | null = document.createElement('div');

    let state = {
      ...initialState,
      isOpen: true,
    } as P;

    function render(props: P) {
      requestAnimationFrame(() => {
        ReactDOM.render(
          ReactDOM.createPortal(
            <Component
              {...props}
              onClose={() => {
                props.onClose?.();
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                close();
              }}
            />,
            document.body
          ),
          mountNode
        );
      });
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
        ReactDOM.unmountComponentAtNode(mountNode as HTMLDivElement);
        mountNode = null;
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
  };
}
