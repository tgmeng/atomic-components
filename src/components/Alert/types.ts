import { HTMLAttributes } from 'react';

export type Intent = 'info' | 'success' | 'danger' | 'warning';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  intent?: Intent;
  message?: React.ReactNode;
  description?: React.ReactNode;
}

export interface AlertContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<AlertProps, 'intent' | 'description'> {}
