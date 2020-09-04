import * as React from 'react';

export type RadioRef = HTMLInputElement;

type A = React.ChangeEvent;

export interface RadioChangeEvent<T = any>
  extends React.BaseSyntheticEvent<
    Event,
    HTMLInputElement & EventTarget,
    { value: T }
  > {
  nativeTarget: HTMLInputElement;
}

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  checked?: boolean;
  onChange?: (event: RadioChangeEvent) => void;
};

export type RadioGroupProps = RadioGroupContextProps;

export interface RadioGroupContextProps<T = any> {
  value: T;
  disabled?: boolean;
  onChange: (event: T) => void;
}
