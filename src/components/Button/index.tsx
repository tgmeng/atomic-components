import React, { SFC } from 'react';
import styled from '@emotion/styled';

import { Color, BaseColor } from '../../styles/color';

type Size = 'small' | 'normal' | 'big';

const sizes = {
  small: `
    padding: 5px 10px;
    font-size: 14px;
  `,
  normal: `
    padding: 10px 20px;
    font-size: 16px;
  `,
  big: `
    padding: 20px 30px;
    font-size: 18px;
  `
};

type Appearance = 'default' | 'solid' | 'dashed' | 'link';

type Kind = 'default' | 'primary' | 'positive' | 'negative' | 'info';

const createGetKindStyle = (appearance: Appearance) => ({
  bgColor,
  color
}: {
  bgColor: string;
  color: string;
}) => {
  switch (appearance) {
    case 'solid':
      return `
          background: ${bgColor};
          border: 1px solid ${bgColor};
          color: ${color};
      `;
    case 'dashed':
      return `
          border: 1px dashed ${bgColor};
          color: ${bgColor};
      `;
    case 'link':
      return `
          border: none;
          color: ${bgColor};
      `;
    default:
      return `
          background: transparent;
          border: 1px solid ${bgColor};
          color: ${bgColor};
      `;
  }
};

export interface ButtonProps {
  appearance?: Appearance;
  kind?: Kind;
  size?: Size;
}

const getSizeStyle = ({ size = 'normal' }: ButtonProps) => sizes[size];
const getKindStyle = ({
  kind = 'default',
  appearance = 'default'
}: ButtonProps) => {
  const _getKindStyle = createGetKindStyle(appearance);

  const kinds = {
    default: _getKindStyle({
      bgColor: 'rgba(0, 0, 0)',
      color: BaseColor.White
    }),
    primary: _getKindStyle({ bgColor: Color.Primary, color: BaseColor.White }),
    info: _getKindStyle({
      bgColor: Color.Info,
      color: BaseColor.White
    }),
    positive: _getKindStyle({
      bgColor: Color.Positive,
      color: BaseColor.White
    }),
    negative: _getKindStyle({ bgColor: Color.Negative, color: BaseColor.White })
  };

  return kinds[kind];
};

const ButtonStyled = styled('button')<ButtonProps>`
  box-sizing: border-box;
  ${getKindStyle};
  ${getSizeStyle};
  cursor: pointer;
  border-radius: 3px;
  outline: none;
  transition: all 0.3s;
`;

export const Button: SFC<ButtonProps> = ({ children, ...props }) => (
  <ButtonStyled {...props}>{children}</ButtonStyled>
);
