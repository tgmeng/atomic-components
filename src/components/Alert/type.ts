export type Indent = 'info' | 'success' | 'danger' | 'warning';

export interface AlertProps {
  indent?: Indent;
  message?: React.ReactNode;
  description?: React.ReactNode;
}
