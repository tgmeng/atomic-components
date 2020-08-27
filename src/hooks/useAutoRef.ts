import * as React from 'react';

export default function useAutoRef<T>(value: T, initialValue?: T) {
  const ref = React.useRef(initialValue);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
