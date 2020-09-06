import * as React from 'react';

import { RadioGroupProps, RadioButtonGroupProps } from './type';

const RadioGroupContext = React.createContext<RadioGroupProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export function useRadioGroupContext(): RadioGroupProps | null {
  return React.useContext(RadioGroupContext);
}

export function useRadioButtonGroupContext(): RadioButtonGroupProps | null {
  return React.useContext(RadioGroupContext);
}
