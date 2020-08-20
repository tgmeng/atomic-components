import { ReactComponent as InfoIcon } from '../../resources/svgs/circle/info.svg';
import { ReactComponent as SuccessIcon } from '../../resources/svgs/circle/check.svg';
import { ReactComponent as DangerIcon } from '../../resources/svgs/circle/close.svg';
import { ReactComponent as WarningIcon } from '../../resources/svgs/circle/warning.svg';

import { createCommonStyledIcon } from './style';

export const IconByIntent = {
  info: createCommonStyledIcon(InfoIcon),
  success: createCommonStyledIcon(SuccessIcon),
  danger: createCommonStyledIcon(DangerIcon),
  warning: createCommonStyledIcon(WarningIcon),
};
