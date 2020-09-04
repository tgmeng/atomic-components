import * as React from 'react';

import { RadioGroupContextProvider } from './RadioGroupContext';
import { RadioGroupProps } from './type';

const RadioGroup: React.FC<RadioGroupProps> = ({
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
      {children}
    </RadioGroupContextProvider>
  );
};

export default RadioGroup;
