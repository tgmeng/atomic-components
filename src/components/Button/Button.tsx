import * as React from 'react';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as OriginalReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonRef, ButtonProps } from './type';
import { Button as StyledButton, reloadIconStyle, IconSpan } from './style';

const ReloadIcon = createCommonStyledIcon(OriginalReloadIcon);

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  ({ children, loading, ...props }, ref) => (
    <StyledButton ref={ref} {...props} loading={loading}>
      {loading && (
        <IconSpan>
          <ReloadIcon css={reloadIconStyle} />
        </IconSpan>
      )}
      <span>{children}</span>
    </StyledButton>
  )
);

export default Button;
