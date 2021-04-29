import * as React from 'react';

import { DropdownProps } from './types';

import { Popper } from '../Popper/Popper';

export const Dropdown: React.FC<DropdownProps> = ({
  hasArrow = false,
  overlay,
  children,
  ...props
}) => (
  <Popper hasArrow={hasArrow} {...props} content={overlay}>
    {React.Children.only(children)}
  </Popper>
);
