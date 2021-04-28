import * as React from 'react';
import clsx from 'clsx';

import { RadioRef, RadioButtonProps } from './types';
import {
  radioWrapperBaseStyle,
  getRadioButtonWrapperStyle,
  radioInputStyle,
  radioButtonStyle,
  getRadioButtonSizeStyle,
} from './styles';

import { mergeRadioGroupContextProps } from './utils';
import { useRadioButtonGroupContext } from './RadioGroupContext';

export const RadioButton = React.forwardRef<RadioRef, RadioButtonProps>(
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
        className={clsx(
          radioWrapperBaseStyle,
          getRadioButtonWrapperStyle({
            variant,
          })
        )}
      >
        <input
          className={radioInputStyle}
          type="radio"
          ref={ref}
          {...restProps}
          {...restNewProps}
        />
        <span
          className={clsx(
            radioButtonStyle,
            getRadioButtonSizeStyle({
              size,
            })
          )}
        >
          {children}
        </span>
      </label>
    );
  }
);
