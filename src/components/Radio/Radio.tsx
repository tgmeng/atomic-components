import * as React from 'react';

import { mergeRadioGroupContextProps } from './utils';

import { RadioRef, RadioProps } from './type';
import {
  radioWrapperBaseStyle,
  radioWrapperStyle,
  RadioInput,
  RadioDot,
  RadioText,
  radioInteractiveStyle,
} from './style';

import { useRadioGroupContext } from './RadioGroupContext';

const Radio = React.forwardRef<RadioRef, RadioProps>(
  ({ children, ...props }, ref) => {
    const context = useRadioGroupContext();
    const newProps = mergeRadioGroupContextProps(context, props);

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        css={[radioWrapperBaseStyle, radioWrapperStyle, radioInteractiveStyle]}
      >
        <RadioInput type="radio" ref={ref} {...props} {...newProps} />
        <RadioDot />
        {children && <RadioText>{children}</RadioText>}
      </label>
    );
  }
);

export default Radio;
