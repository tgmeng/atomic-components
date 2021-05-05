import * as React from 'react';
import clsx from 'clsx';

import { createCommonStyledIcon } from '../Icon/styles';

import { ReactComponent as OriginalLoadingIcon } from '../../resources/svgs/loading.svg';

import { ButtonRef, ButtonProps } from './types';
import {
  loadingIconStyle,
  iconStyle,
  baseStyle,
  getSizeStyle,
  getVariantStyle,
  loadingStyle,
  getDisabledStyle,
} from './styles';

const LoadingIcon = createCommonStyledIcon(OriginalLoadingIcon);

export const Button = React.forwardRef<ButtonRef, ButtonProps>(function Button(
  { className, children, loading, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        baseStyle,
        getVariantStyle(props),
        getSizeStyle(props),
        disabled && getDisabledStyle(props),
        loading && loadingStyle,
        className
      )}
      disabled={disabled || loading}
    >
      {loading && (
        <span className={iconStyle}>
          <LoadingIcon className={loadingIconStyle} />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
});
