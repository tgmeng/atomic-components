export type Intent = 'info' | 'success' | 'danger' | 'warning';

export interface AlertProps {
  intent?: Intent;
  message?: React.ReactNode;
  description?: React.ReactNode;
}
