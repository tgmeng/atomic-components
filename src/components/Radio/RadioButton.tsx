import * as React from 'react';

import { RadioRef, RadioButtonProps } from './type';
import {
  RadioInput,
  radioWrapperBaseStyle,
  RadioButton as StyledRadioButton,
  getRadioButtonWrapperStyle,
} from './style';

import { mergeRadioGroupContextProps } from './utils';
import { useRadioButtonGroupContext } from './RadioGroupContext';

const RadioButton = React.forwardRef<RadioRef, RadioButtonProps>(
  ({ children, ...props }, ref) => {
    const context = useRadioButtonGroupContext();
    const newProps = mergeRadioGroupContextProps(context, props);

    if (context) {
      Object.assign(newProps, {
        variant: props.variant ?? context.variant,
        size: props.size ?? context.size,
      });
    }

    const { size, variant, ...restNewProps } = newProps;
    const { size: _size, ...restProps } = props;

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        css={[
          radioWrapperBaseStyle,
          getRadioButtonWrapperStyle({
            variant,
          }),
        ]}
      >
        <RadioInput type="radio" ref={ref} {...restProps} {...restNewProps} />
        <StyledRadioButton variant={variant} size={size}>
          {children}
        </StyledRadioButton>
      </label>
    );
  }
);

export default RadioButton;
