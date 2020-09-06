import * as React from 'react';

import { RadioGroupProps } from './type';
import { radioGroupStyle } from './style';

import { RadioGroupContextProvider } from './RadioGroupContext';

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
      <div css={radioGroupStyle}>{children}</div>
    </RadioGroupContextProvider>
  );
};

export default RadioGroup;
