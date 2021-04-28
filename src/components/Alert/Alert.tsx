import * as React from 'react';
import { HTMLAttributes } from 'react';
import { ReactComponent as SuccessIcon } from '../../resources/svgs/circle/check.svg';
import { ReactComponent as DangerIcon } from '../../resources/svgs/circle/close.svg';
import { ReactComponent as InfoIcon } from '../../resources/svgs/circle/info.svg';
import { ReactComponent as WarningIcon } from '../../resources/svgs/circle/warning.svg';
import { createStyledHTMLComponent } from '../../utils/component';
import { createCommonStyledIcon } from '../Icon/style';
import {
  alertDescriptionStyle,
  alertMessageStyle,
  getAlertContainerStyle,
  getIconStyle,
  iconStyle,
} from './styles';
import { AlertContainerProps, AlertProps, Intent } from './types';

const iconByIntent = {
  info: createCommonStyledIcon(InfoIcon),
  success: createCommonStyledIcon(SuccessIcon),
  danger: createCommonStyledIcon(DangerIcon),
  warning: createCommonStyledIcon(WarningIcon),
};

export const Icon = createStyledHTMLComponent<
  HTMLSpanElement,
  { intent: Intent } & HTMLAttributes<HTMLSpanElement>
>('span', (props) => getIconStyle(props));

export const AlertContainer = createStyledHTMLComponent<
  HTMLDivElement,
  AlertContainerProps
>('div', (props) => getAlertContainerStyle(props));

export const AlertMessage = createStyledHTMLComponent<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>('div', alertMessageStyle);

export const AlertDescription = createStyledHTMLComponent<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>('div', alertDescriptionStyle);

export const Alert: React.FC<AlertProps> = ({
  intent = 'info',
  description,
  children,
  ...restProps
}) => (
  <AlertContainer intent={intent} description={description} {...restProps}>
    <Icon className={iconStyle} intent={intent}>
      {React.createElement(iconByIntent[intent])}
    </Icon>
    <AlertMessage>{children}</AlertMessage>
    {description && <AlertDescription>{description}</AlertDescription>}
  </AlertContainer>
);
