import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { math } from 'polished';
import { generate } from '@ant-design/colors';

import { Color, FontSize, TextColor, LineHeight } from '../../styles';

import { Intent, AlertProps } from './type';

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

export const AlertMessage = styled('div')`
  color: ${TextColor.Heading};
  line-height: ${LineHeight.Base};
`;

export const AlertDescription = styled('div')`
  margin-top: 5px;
  font-size: ${FontSize.Base};
  color: ${TextColor.Base};
  line-height: ${LineHeight.Base};
`;

const iconColorByIntent: Record<Intent, string> = {
  info: Color.Info,
  success: Color.Success,
  danger: Color.Danger,
  warning: Color.Warning,
};

export const Icon = styled('span')<{ intent: Intent }>`
  position: absolute;
  color: ${(props) => iconColorByIntent[props.intent || 'info']};
  left: 8px;
  line-height: 1;
`;

const colorObjectByIntent: Record<Intent, AlertColorObject> = {
  info: generateAlertColorObject(Color.Info),
  success: generateAlertColorObject(Color.Success),
  danger: generateAlertColorObject(Color.Danger),
  warning: generateAlertColorObject(Color.Warning),
};

export type StyledAlertProps = Pick<AlertProps, 'intent' | 'description'>;

export const getAlertLayoutStyle = (props: StyledAlertProps) => {
  const fontSize = props.description ? FontSize.Medium : FontSize.Base;
  const iconSize = props.description ? FontSize.Large : FontSize.Medium;

  return css`
    padding-left: ${math(`8px + ${iconSize} + 5px`)};

    ${AlertMessage} {
      font-size: ${fontSize};
    }
    ${Icon} {
      top: ${math(`8px + (${LineHeight.Base} - ${iconSize}) / 2`)};
      font-size: ${iconSize};
    }
  `;
};

export const Alert = styled('div')<StyledAlertProps>`
  position: relative;
  padding: 8px;
  ${(props) => getAlertColor(colorObjectByIntent[props.intent || 'info'])};
  border-radius: 2px;
  ${getAlertLayoutStyle};
`;
