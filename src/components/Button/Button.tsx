import * as React from 'react';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as OriginalReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonProps } from './type';
import { Button as StyledButton, reloadIconStyle, IconSpan } from './style';

const ReloadIcon = createCommonStyledIcon(OriginalReloadIcon);

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <StyledButton {...props} loading={loading}>
    {loading && (
      <IconSpan>
        <ReloadIcon css={reloadIconStyle} />
      </IconSpan>
    )}
    <span>{children}</span>
  </StyledButton>
);

export default Button;
