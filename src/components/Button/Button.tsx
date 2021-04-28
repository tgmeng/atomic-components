import * as React from 'react';
import clsx from 'clsx';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as OriginalReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonRef, ButtonProps } from './type';
import { reloadIconStyle, iconStyle, getButtonStyle } from './style';

const ReloadIcon = createCommonStyledIcon(OriginalReloadIcon);

export const Button = React.forwardRef<ButtonRef, ButtonProps>(function Button(
  { className, children, loading, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(getButtonStyle(props), className)}
      type="button"
      {...props}
    >
      {loading && (
        <span className={iconStyle}>
          <ReloadIcon className={reloadIconStyle} />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
});
