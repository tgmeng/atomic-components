import * as React from 'react';

import { DropdownProps } from './type';

import Popper from '../Popper/Popper';

const Dropdown: React.FC<DropdownProps> = ({
  hasArrow = false,
  overlay,
  children,
  ...props
}) => (
  <Popper hasArrow={hasArrow} {...props} content={overlay}>
    {React.Children.only(children)}
  </Popper>
);

export default Dropdown;
