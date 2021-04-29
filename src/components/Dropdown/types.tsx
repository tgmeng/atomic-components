import { BasePopperProps } from '../Popper/types';

export interface DropdownProps extends BasePopperProps {
  overlay: React.ReactNode;
}

export interface DropdownButtonProps extends DropdownProps {}
