import * as React from 'react';

import { RadioGroupProps } from './types';
import { radioGroupStyle } from './styles';

import { RadioGroupContextProvider } from './RadioGroupContext';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  onChange,
  children,
  ...props
}) => {
  const onRadioChange = React.useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <RadioGroupContextProvider
      value={{
        ...props,
        onChange: onRadioChange,
      }}
    >
      <div className={radioGroupStyle}>{children}</div>
    </RadioGroupContextProvider>
  );
};
