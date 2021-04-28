import * as React from 'react';

export type IsMountedFn = () => boolean;

export function useMountedState(): IsMountedFn {
  const isMountedRef = React.useRef<boolean>(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = true;
    };
  }, []);
  return React.useCallback<IsMountedFn>(() => isMountedRef.current, []);
}
