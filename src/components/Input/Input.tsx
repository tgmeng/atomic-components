import * as React from 'react';

import { ReactComponent as ClearIcon } from '../../resources/svgs/circle-fill/close.svg';

import { InputProps } from './type';
import {
  InputWrapper,
  InputSpan,
  Input as StyledInput,
  iconStyle,
  prefixStyle,
  suffixStyle,
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
    <InputWrapper
      size={size}
      isFocus={isFocus}
      isDisabled={disabled}
      onClick={focus}
    >
      {prefix && <InputSpan css={prefixStyle}>{prefix}</InputSpan>}
      <StyledInput
        {...restProps}
        ref={inputRef}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isClearable && !readOnly && (
        <InputSpan
          css={suffixStyle}
          isHidden={Boolean(!value || `${value}`.length === 0)}
        >
          <ClearIcon css={iconStyle} onClick={handleClear} />
        </InputSpan>
      )}
      {suffix && <InputSpan css={suffixStyle}>{suffix}</InputSpan>}
    </InputWrapper>
  );
};

export default Input;
