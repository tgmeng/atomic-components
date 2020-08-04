import * as React from 'react';
import { ClassNames } from '@emotion/core';

import Popper from '../Popper';

import { TooltipProps } from './type';
import { contentStyle, arrowStyle } from './style';

const Tooltip: React.FC<TooltipProps> = ({ title, children, ...restProps }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Popper
          {...restProps}
          content={title}
          contentClassName={css(contentStyle)}
          arrowClassName={css(arrowStyle)}
        >
          {children}
        </Popper>
      )}
    </ClassNames>
  );
};

export default Tooltip;
