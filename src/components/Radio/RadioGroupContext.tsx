import * as React from 'react';

import { RadioGroupContextProps } from './type';

const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(
  null
);

export function RadioGroupContextProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: RadioGroupContextProps }>) {
  return (
    <RadioGroupContext.Provider value={value}>
      {children}
    </RadioGroupContext.Provider>
  );
}

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}
