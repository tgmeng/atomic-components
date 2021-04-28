import { BasePopperProps } from '../Popper/type';

export interface DropdownProps extends BasePopperProps {
  overlay: React.ReactNode;
}

export interface DropdownButtonProps extends DropdownProps {}
