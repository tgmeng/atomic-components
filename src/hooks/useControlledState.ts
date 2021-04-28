import * as React from 'react';

export function useControlledState<S = undefined>(
  state?: S,
  handleStateChange?: (state: S) => void,
  initialState?: S
): [S | undefined, React.Dispatch<React.SetStateAction<S>>] {
  const [uncontrolledState, setUncontrolledState] = React.useState<
    S | undefined
  >(initialState);

  const isControlled = state !== undefined;

  const setState = React.useCallback(
    (action) => {
      setUncontrolledState(action);
      handleStateChange?.(
        typeof action === 'function'
          ? action(isControlled ? state : uncontrolledState)
          : action
      );
    },
    [isControlled, state, uncontrolledState, handleStateChange]
  );

  return [isControlled ? state : uncontrolledState, setState];
}
