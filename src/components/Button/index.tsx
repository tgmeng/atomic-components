import * as React from 'react';

import { ReactComponent as ReloadIcon } from '../../resources/svgs/reload.svg';

import { ButtonProps } from './type';
import { StyledButton, ReloadIconStyle, IconSpan } from './style';

export { ButtonProps };

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <StyledButton loading={loading} {...props}>
    {loading && (
      <IconSpan>
        <ReloadIcon css={ReloadIconStyle} />
      </IconSpan>
    )}
    <span>{children}</span>
  </StyledButton>
);

export default Button;
