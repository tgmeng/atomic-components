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
    <Button>{children}</Button>
    <Popper hasArrow={hasArrow} {...props} content={overlay}>
      <Button>...</Button>
    </Popper>
  </ButtonGroup>
);

export default DropdownButton;
