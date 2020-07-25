import * as React from 'react';

import { createCommonStyledIcon } from '../Icon/style';

import { ReactComponent as InfoIcon } from '../../resources/svgs/circle/info.svg';
import { ReactComponent as SuccessIcon } from '../../resources/svgs/circle/check.svg';
import { ReactComponent as DangerIcon } from '../../resources/svgs/circle/close.svg';
import { ReactComponent as WarningIcon } from '../../resources/svgs/circle/warning.svg';

import { AlertProps } from './type';
import {
  Alert as StyledAlert,
  AlertMessage,
  AlertDescription,
  Icon,
} from './style';

const iconByIntent = {
  info: createCommonStyledIcon(InfoIcon),
  success: createCommonStyledIcon(SuccessIcon),
  danger: createCommonStyledIcon(DangerIcon),
  warning: createCommonStyledIcon(WarningIcon),
};

const Alert: React.SFC<AlertProps> = ({
  intent = 'info',
  description,
  children,
  ...restProps
}) => (
  <StyledAlert intent={intent} description={description} {...restProps}>
    <Icon intent={intent}>{React.createElement(iconByIntent[intent])}</Icon>
    <AlertMessage>{children}</AlertMessage>
    {description && <AlertDescription>{description}</AlertDescription>}
  </StyledAlert>
);

export default Alert;
