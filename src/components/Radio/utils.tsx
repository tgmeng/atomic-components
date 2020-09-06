import * as React from 'react';
import { RadioChangeEvent, BaseRadioProps, RadioGroupProps } from './type';

export function mergeRadioGroupContextProps<T extends BaseRadioProps>(
  context: RadioGroupProps | null,
  props: T
): Omit<T, 'onChange'> & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} {
  const { onChange, ...restProps } = props;

  const localProps = { ...restProps };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const wrappedEvent: RadioChangeEvent = Object.create(event);
    wrappedEvent.target = {
      value: props.value,
    };
    wrappedEvent.nativeTarget = event.target;

    onChange?.(wrappedEvent);
    context?.onChange?.(wrappedEvent);
  };

  if (context) {
    Object.assign(localProps, {
      checked: props.value === context.value,
      disabled: props.disabled ?? context.disabled,
      onChange: _onChange,
    });
  }

  return localProps;
}
