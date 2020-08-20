import * as React from 'react';

export default function usePrevious<T>(value: T) {
  const prevRef = React.useRef<T>();
  const curRef = React.useRef<T>();
  prevRef.current = curRef.current;
  curRef.current = value;
  return prevRef.current;
}
