import { css } from '@emotion/css';
import { createComponentWithPresetProps } from '../../utils/component';
import { SVGRComponent } from '../../types';

export const iconStyle = css`
  display: inline-block;
  line-height: 1;
  vertical-align: -0.125em;
`;

export const createCommonStyledIcon = (IconComponent: SVGRComponent) =>
  createComponentWithPresetProps(IconComponent, {
    className: iconStyle,
  });
