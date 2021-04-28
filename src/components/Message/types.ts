import { HTMLAttributes } from 'react';
import { Intent as CommonIntent, OpenableProps } from '../../types';

export type Intent = CommonIntent;

export interface MessageProps
  extends OpenableProps,
    HTMLAttributes<HTMLDivElement> {
  duration?: number;
  intent?: Intent;
}
