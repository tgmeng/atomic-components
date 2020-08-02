import { PopperProps } from '../type';

export interface PopoverProps extends Omit<PopperProps, 'content'> {
  title: React.ReactNode;
  content: React.ReactNode;
}
