import * as React from 'react';

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

const Input: React.FC<InputProps> = ({
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = React.useState(false);

  const focus = React.useCallback(() => inputRef.current?.focus(), []);

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleClear = React.useCallback(
    (event: React.MouseEvent<SVGElement, MouseEvent>) => {
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

        const wrappedEvent: React.ChangeEvent<HTMLInputElement> = Object.create(
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
    <span
      css={getInputWrapperStyle({
        size,
        isFocus,
        isDisabled: disabled,
      })}
      onClick={focus}
    >
      {prefix && <span css={[getInputSpanStyle(), prefixStyle]}>{prefix}</span>}
      <input
        {...restProps}
        ref={inputRef}
        css={getInputStyle({ size, isDisabled: Boolean(disabled) })}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isClearable && !readOnly && (
        <span
          css={[
            getInputSpanStyle({
              isHidden: Boolean(!value || `${value}`.length === 0),
            }),
            suffixStyle,
          ]}
        >
          <ClearIcon css={iconStyle} onClick={handleClear} />
        </span>
      )}
      {suffix && <span css={[getInputSpanStyle(), suffixStyle]}>{suffix}</span>}
    </span>
  );
};

export default Input;
