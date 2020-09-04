import * as React from 'react';

import { RadioRef, RadioProps, RadioChangeEvent } from './type';
import {
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

    const _props = { ...props };

    const _onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const wrappedEvent: RadioChangeEvent = Object.create(event);
        wrappedEvent.target = {
          value: props.value,
        };
        wrappedEvent.nativeTarget = event.target;

        props.onChange?.(wrappedEvent);
        context?.onChange(wrappedEvent);
      },
      [context?.onChange, props.onChange, props.value]
    );

    if (context) {
      Object.assign(_props, {
        checked: props.value === context.value,
        disabled: props.disabled ?? context.disabled,
        onChange: _onChange,
      });
    }

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label css={[radioWrapperStyle, radioInteractiveStyle]}>
        <RadioInput type="radio" ref={ref} {...props} {..._props} />
        <RadioDot />
        {children && <RadioText>{children}</RadioText>}
      </label>
    );
  }
);

export default Radio;
