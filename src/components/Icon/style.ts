import styled from '@emotion/styled';

import { SVGRComponent } from '../../types';

export const styleCommonIcon = (IconComponent: SVGRComponent) => styled(
  IconComponent
)`
  display: inline-block;
  line-height: 1;
  vertical-align: -0.125em;
`;
