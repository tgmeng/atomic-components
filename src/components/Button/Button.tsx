import * as React from 'react';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as OriginalReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonRef, ButtonProps } from './type';
import { reloadIconStyle, iconStyle, getButtonStyle } from './style';

const ReloadIcon = createCommonStyledIcon(OriginalReloadIcon);

const Button = React.forwardRef<ButtonRef, ButtonProps>(function Button(
  { children, loading, ...props },
  ref
) {
  return (
    <button ref={ref} css={getButtonStyle(props)} type="button" {...props}>
      {loading && (
        <span css={iconStyle}>
          <ReloadIcon css={reloadIconStyle} />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
});

export default Button;
