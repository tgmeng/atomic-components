import * as React from 'react';
import update, { Spec } from 'immutability-helper';

function reducer<S, A extends Spec<S>>(state: S, action: A) {
  return update(state, action);
}

export function useStateWithImmutabilityHelper<S, A extends Spec<S>>(
  initialState: S
): [S, React.Dispatch<A>] {
  return React.useReducer<React.Reducer<S, A>>(reducer, initialState);
}
