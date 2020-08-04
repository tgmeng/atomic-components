import { Placement, PositioningStrategy } from '@popperjs/core';

export type Trigger = 'hover' | 'click' | 'focus';

export interface BasePopperProps {
  isOpen?: boolean;
  placement?: Placement;
  strategy?: PositioningStrategy;
  trigger?: Trigger;
  children: React.ReactElement;
}

export interface PopperProps extends BasePopperProps {
  content: React.ReactNode;
  contentClassName?: string;
  arrowClassName?: string;
}
