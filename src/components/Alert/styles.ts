import { css } from '@emotion/css';
import { math } from 'polished';
import { generate } from '@ant-design/colors';

import { refStyle } from '../../utils/style';
import { Color, FontSize, TextColor, LineHeight } from '../../styles';

import { Intent, AlertContainerProps } from './types';

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

export const alertMessageStyle = css`
  color: ${TextColor.Heading};
  line-height: ${LineHeight.Base};
`;

export const alertDescriptionStyle = css`
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

export const iconStyle = css`
  position: absolute;
  left: 8px;
  line-height: 1;
`;

export const getIconStyle = (props: { intent: Intent }) => css`
  color: ${iconColorByIntent[props.intent || 'info']};
`;

const colorObjectByIntent: Record<Intent, AlertColorObject> = {
  info: generateAlertColorObject(Color.Info),
  success: generateAlertColorObject(Color.Success),
  danger: generateAlertColorObject(Color.Danger),
  warning: generateAlertColorObject(Color.Warning),
};

export const getAlertLayoutStyle = (props: AlertContainerProps) => {
  const fontSize = props.description ? FontSize.Medium : FontSize.Base;
  const iconSize = props.description ? FontSize.Large : FontSize.Medium;

  return css`
    padding-left: ${math(`8px + ${iconSize} + 5px`)};

    ${refStyle(alertMessageStyle)} {
      font-size: ${fontSize};
    }
    ${refStyle(iconStyle)} {
      top: ${math(`8px + (${LineHeight.Base} - ${iconSize}) / 2`)};
      font-size: ${iconSize};
    }
  `;
};

export const getAlertContainerStyle = (props: AlertContainerProps) => css`
  position: relative;
  padding: 8px;
  ${getAlertColor(colorObjectByIntent[props.intent || 'info'])};
  border-radius: 2px;
  ${getAlertLayoutStyle(props)};
`;
