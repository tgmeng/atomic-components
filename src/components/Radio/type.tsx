import * as React from 'react';
import { Size as CommonSize } from '../../types';

export type RadioRef = HTMLInputElement;

export interface RadioChangeEvent<T = any>
  extends React.BaseSyntheticEvent<
    Event,
    HTMLInputElement & EventTarget,
    { value: T }
  > {
  nativeTarget: HTMLInputElement;
}

/**
 * Radio
 */

export interface BaseRadioProps<V = any> {
  value?: V;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: RadioChangeEvent) => void;
}

export type RadioProps<V = any> = React.InputHTMLAttributes<HTMLInputElement> &
  BaseRadioProps<V>;

/**
 * RadioButton
 */

export type RadioButtonVariant = 'default' | 'solid';
export type RadioButtonSize = CommonSize;

export interface RadioButtonProps<T = any> extends Omit<RadioProps<T>, 'size'> {
  size?: RadioButtonSize;
  variant?: RadioButtonVariant;
}

/**
 * RadioGroup
 */

export interface RadioGroupProps<V = any> {
  value?: V;
  disabled?: boolean;
  onChange?: (event: V) => void;
}

export interface RadioButtonGroupProps<V = any> extends RadioGroupProps<V> {
  variant?: RadioButtonVariant;
  size?: RadioButtonSize;
}
