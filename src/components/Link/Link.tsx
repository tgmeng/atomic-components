import * as React from 'react';
import clsx from 'clsx';

import { LinkProps } from './types';
import { linkStyle } from './styles';

export const Link: React.FC<LinkProps> = ({
  className,
  target,
  rel,
  children,
  ...restProps
}) => {
  const _rel =
    target === '_blank' ? `${rel ? `${rel} ` : ''}noopener noreferrer` : rel;
  return (
    <a
      {...restProps}
      className={clsx(linkStyle, className)}
      target={target}
      rel={_rel}
    >
      {children}
    </a>
  );
};
