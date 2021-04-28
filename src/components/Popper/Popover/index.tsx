import * as React from 'react';

import { createStyledHTMLComponent } from '../../../utils/component';

import { Popper } from '../Popper';

import { PopoverProps } from './types';
import { titleStyle, contentStyle } from './styles';

export const Title = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  titleStyle
);

export const Content = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  contentStyle
);

export const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  children,
  ...restProps
}) => {
  return (
    <Popper
      {...restProps}
      content={
        <>
          <Title>{title}</Title>
          <Content>{content}</Content>
        </>
      }
    >
      {children}
    </Popper>
  );
};
