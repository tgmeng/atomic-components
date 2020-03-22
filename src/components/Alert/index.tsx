import React, { SFC } from 'react';
import { Color, BaseColor } from '../../styles/color';

export type Kind = 'info' | 'positive' | 'negative' | 'warning';
export type KindMap = Record<Kind, string>;

const kinds: KindMap = {
  info: Color.Info,
  positive: Color.Positive,
  negative: Color.Negative,
  warning: Color.Warning
};

export interface AlertProps {
  kind?: 'info' | 'positive' | 'negative' | 'warning';
}

export const Alert: SFC<AlertProps> = ({
  children,
  kind = 'info',
  ...rest
}) => (
  <div
    style={{
      padding: 20,
      background: kinds[kind] || BaseColor.White,
      borderRadius: 3,
      color: BaseColor.White
    }}
    {...rest}
  >
    {children}
  </div>
);
