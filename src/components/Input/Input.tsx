import * as React from 'react';
import {
  FC,
  useCallback,
  useRef,
  useState,
  FocusEvent,
  MouseEvent,
  ChangeEvent,
} from 'react';
import clsx from 'clsx';

import { ReactComponent as ClearIcon } from '../../resources/svgs/circle-fill/close.svg';

import { InputProps } from './type';
import {
  getInputSpanStyle,
  getInputStyle,
  iconStyle,
  prefixStyle,
  suffixStyle,
  getInputWrapperStyle,
} from './style';

export const Input: FC<InputProps> = ({
  value,
  size = 'normal',
  prefix,
  suffix,
  readOnly,
  disabled,
  isClearable,
  children,
  onChange,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const focus = useCallback(() => inputRef.current?.focus(), []);

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleClear = useCallback(
    (event: MouseEvent<SVGElement, MouseEvent>) => {
      const { current: _inputRef } = inputRef;
      if (!_inputRef) {
        return;
      }

      if (value === undefined) {
        // uncontrolled
        _inputRef.value = '';
        return;
      }

      if (onChange) {
        const originalInputValue = _inputRef.value;
        _inputRef.value = '';

        const wrappedEvent: ChangeEvent<HTMLInputElement> = Object.create(
          event
        );
        wrappedEvent.target = _inputRef;
        wrappedEvent.currentTarget = _inputRef;
        onChange(wrappedEvent);

        _inputRef.value = originalInputValue;
      }
    },
    [value, onChange]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <span
      className={getInputWrapperStyle({
        size,
        isFocus,
        isDisabled: disabled,
      })}
      onClick={focus}
    >
      {prefix && (
        <span className={clsx(getInputSpanStyle(), prefixStyle)}>{prefix}</span>
      )}
      <input
        {...restProps}
        ref={inputRef}
        className={getInputStyle({ size, isDisabled: Boolean(disabled) })}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isClearable && !readOnly && (
        <span
          className={clsx(
            getInputSpanStyle({
              isHidden: Boolean(!value || `${value}`.length === 0),
            }),
            suffixStyle
          )}
        >
          <ClearIcon className={iconStyle} onClick={handleClear} />
        </span>
      )}
      {suffix && (
        <span className={clsx(getInputSpanStyle(), suffixStyle)}>{suffix}</span>
      )}
    </span>
  );
};
