import { Intent as CommonIntent, OpenableProps } from '../../types';

export type Intent = CommonIntent;

export interface MessageProps extends OpenableProps {
  duration?: number;
  intent?: Intent;
}
