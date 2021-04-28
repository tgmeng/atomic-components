import * as React from 'react';
import { FC } from 'react';

import { Popper } from '../Popper';

import { TooltipProps } from './type';
import { contentStyle, arrowStyle } from './style';

export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  ...restProps
}) => {
  return (
    <Popper
      {...restProps}
      content={title}
      contentClassName={contentStyle}
      arrowClassName={arrowStyle}
    >
      {children}
    </Popper>
  );
};
