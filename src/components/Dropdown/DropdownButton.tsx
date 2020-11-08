import * as React from 'react';

import Button, { ButtonGroup } from '../Button';

import Popper from '../Popper/Popper';

import { DropdownProps } from './type';

const DropdownButton: React.FC<DropdownProps> = ({
  hasArrow = false,
  overlay,
  children,
  ...props
}) => (
  <ButtonGroup>
    <Button {...props}>{children}</Button>
    <Popper hasArrow={hasArrow} content={overlay}>
      <Button>...</Button>
    </Popper>
  </ButtonGroup>
);

export default DropdownButton;
