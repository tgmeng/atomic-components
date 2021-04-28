import * as React from 'react';

import { ReactComponent as EllipsisIcon } from '../../resources/svgs/ellipsis.svg';

import { Button, ButtonGroup } from '../Button';

import { Popper } from '../Popper/Popper';

import { DropdownProps } from './type';

export const DropdownButton: React.FC<DropdownProps> = ({
  hasArrow = false,
  overlay,
  children,
  ...props
}) => (
  <ButtonGroup>
    <Button {...props}>{children}</Button>
    <Popper hasArrow={hasArrow} content={overlay}>
      <Button>
        <EllipsisIcon />
      </Button>
    </Popper>
  </ButtonGroup>
);
