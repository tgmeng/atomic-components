import * as React from 'react';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as RawReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonProps } from './type';
import { Button as StyledButton, ReloadIconStyle, IconSpan } from './style';

const ReloadIcon = createCommonStyledIcon(RawReloadIcon);

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <StyledButton {...props} loading={loading}>
    {loading && (
      <IconSpan>
        <ReloadIcon css={ReloadIconStyle} />
      </IconSpan>
    )}
    <span>{children}</span>
  </StyledButton>
);

export default Button;
