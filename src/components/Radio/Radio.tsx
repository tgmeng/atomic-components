import * as React from 'react';
import clsx from 'clsx';

import { mergeRadioGroupContextProps } from './utils';

import { RadioRef, RadioProps } from './types';
import {
  radioWrapperBaseStyle,
  radioWrapperStyle,
  radioInteractiveStyle,
  radioDotStyle,
  radioTextStyle,
  radioInputStyle,
} from './styles';

import { useRadioGroupContext } from './RadioGroupContext';

export const Radio = React.forwardRef<RadioRef, RadioProps>(
  ({ className, children, ...props }, ref) => {
    const context = useRadioGroupContext();
    const newProps = mergeRadioGroupContextProps(context, props);

    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={clsx(
          radioWrapperBaseStyle,
          radioWrapperStyle,
          radioInteractiveStyle,
          className
        )}
      >
        <input
          className={radioInputStyle}
          type="radio"
          ref={ref}
          {...props}
          {...newProps}
        />
        <span className={radioDotStyle} />
        {children && <span className={radioTextStyle}>{children}</span>}
      </label>
    );
  }
);
