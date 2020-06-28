import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { generate } from '@ant-design/colors';

import { Color, FontSize, TextColor } from '../../styles';

import { Indent, AlertProps } from './type';

const generateAlertColorObject = (color: string) => {
  return {
    backgroundColor: generate(color)[0],
    borderColor: generate(color)[3],
  };
};

interface AlertColorObject {
  backgroundColor: string;
  borderColor: string;
}

const getAlertColor = ({
  backgroundColor,
  borderColor,
}: AlertColorObject) => css`
  background-color: ${backgroundColor};
  border: 1px solid ${borderColor};
`;

const colorObjectByIndent: Record<Indent, AlertColorObject> = {
  info: generateAlertColorObject(Color.Info),
  success: generateAlertColorObject(Color.Success),
  danger: generateAlertColorObject(Color.Danger),
  warning: generateAlertColorObject(Color.Warning),
};

export const Alert = styled('div')<AlertProps>`
  padding: 8px 15px;
  color: ${TextColor.Heading};
  font-size: ${FontSize.Base};
  ${(props: AlertProps) =>
    getAlertColor(colorObjectByIndent[props.indent || 'info'])};
  border-radius: 2px;
`;

export const AlertMessage = styled('div')``;
export const AlertDescription = styled('div')``;

const iconColorByIndent: Record<Indent, string> = {
  info: Color.Info,
  success: Color.Success,
  danger: Color.Danger,
  warning: Color.Warning,
};

export const Icon = styled('span')<{ indent: Indent }>`
  color: ${(props) => iconColorByIndent[props.indent || 'info']};
`;
