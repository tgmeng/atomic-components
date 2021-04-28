import { Placement, PositioningStrategy } from '@popperjs/core';

export type Trigger = 'hover' | 'click' | 'focus';

export interface BasePopperProps {
  isOpen?: boolean;
  placement?: Placement;
  strategy?: PositioningStrategy;
  trigger?: Trigger;
  hasArrow?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  children: React.ReactElement;
  onOpenChange?: (value: boolean) => void;
}

export interface PopperProps extends BasePopperProps {
  content: React.ReactNode;
  contentClassName?: string;
  arrowClassName?: string;
}
