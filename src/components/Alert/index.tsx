import * as React from 'react';

import { styleCommonIcon } from '../Icon/style';

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

const iconByIndent = {
  info: styleCommonIcon(InfoIcon),
  success: styleCommonIcon(SuccessIcon),
  danger: styleCommonIcon(DangerIcon),
  warning: styleCommonIcon(WarningIcon),
};

const Alert: React.SFC<AlertProps> = ({
  indent = 'info',
  message,
  description,
  children,
  ...restProps
}) => (
  <StyledAlert {...restProps} indent={indent}>
    <Icon indent={indent}>{React.createElement(iconByIndent[indent])}</Icon>
    <AlertMessage>{message ?? children}</AlertMessage>
    {description && <AlertDescription>{description}</AlertDescription>}
  </StyledAlert>
);

export default Alert;
