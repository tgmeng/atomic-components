import * as React from 'react';

import { LinkProps } from './type';
import { Link as StyledLink } from './style';

const Link: React.FC<LinkProps> = ({ target, rel, children, ...restProps }) => {
  const _rel =
    target === '_blank' ? `${rel ? `${rel} ` : ''}noopener noreferrer` : rel;
  return (
    <StyledLink {...restProps} target={target} rel={_rel}>
      {children}
    </StyledLink>
  );
};

export default Link;
