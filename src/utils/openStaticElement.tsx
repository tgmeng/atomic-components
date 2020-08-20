import * as ReactDOM from 'react-dom';

import { OpenableProps } from '../types';

export interface StaticElement<P> {
  update(props: Partial<React.PropsWithChildren<P>>): void;
  close(): void;
}

export default function openStaticElement<P extends OpenableProps>(
  renderElement: (state: P) => React.ReactElement<P>,
  initialState?: Partial<P>
): StaticElement<P> {
  let mountNode: HTMLDivElement | null = document.createElement('div');

  let state = {
    ...initialState,
    isOpen: true,
  } as P;

  function render(props: P) {
    requestAnimationFrame(() => {
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
}
