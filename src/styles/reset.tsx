import { css } from '@emotion/core';

import { TextColor } from './color';
import { FontSize, LineHeight } from './font';

export const resetBox = css`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

export const resetTypography = css`
  color: ${TextColor.Base};
  font-size: ${FontSize.Base};
  line-height: ${LineHeight.Base};
`;

export const resetComponent = css`
  ${resetBox};
  ${resetTypography};
`;
