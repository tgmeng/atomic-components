import * as React from 'react';

export default function useModalState(initialIsOpen: boolean) {
  const [isOpen, setIsOpen] = React.useState(initialIsOpen);
  return React.useMemo(
    () => [
      {
        isOpen,
        onClose: () => setIsOpen(false),
      },
      setIsOpen,
    ],
    [isOpen]
  );
}