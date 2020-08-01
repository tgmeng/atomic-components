import { Placement, PositioningStrategy } from '@popperjs/core';

export type Trigger = 'hover' | 'click' | 'focus';

export interface PopperProps {
  isOpen?: boolean;
  content: React.ReactElement;
  placement?: Placement;
  strategy?: PositioningStrategy;
  trigger?: Trigger | Trigger[] | 'manual';
  children: React.ReactElement;
}

export interface TooltipProps extends PopperProps {
  title: React.ReactNode;
}

export interface PopoverProps extends PopperProps {}
