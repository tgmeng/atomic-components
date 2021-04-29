import * as React from 'react';
import { LayoutContextProps } from './types';

export const LayoutContext = React.createContext<LayoutContextProps>({
  asideHook: {
    add: () => {},
    remove: () => {},
  },
});

export const useLayoutContext = () => {
  return React.useContext(LayoutContext);
};
