import * as React from 'react';

import Popper from '../Popper';

import { PopoverProps } from './type';
import { Title, Content } from './style';

const Popover: React.FC<PopoverProps> = ({
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

export default Popover;
