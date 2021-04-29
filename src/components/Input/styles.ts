import { css } from '@emotion/css';
import { transparentize } from 'polished';

import { generate } from '@ant-design/colors';

import {
  resetTypography,
  resetBox,
  FontSize,
  Size as StyleSize,
  Color,
  TextColor,
  BorderColor,
  BaseColor,
  BackgroundColor,
  resetDecoration,
} from '../../styles';

import { Size } from './types';

export const InputColor = TextColor;

export const getInputSizeStyle = (props: { size: Size }) => {
  switch (props.size) {
    case 'small':
      return css`
        font-size: ${FontSize.Base};
      `;
    case 'large':
      return css`
        font-size: ${FontSize.Medium};
      `;
    default:
    case 'normal':
      return css`
        font-size: ${FontSize.Base};
      `;
  }
};

export const inputDisabledStyle = css`
  color: ${Color.Disabled};
`;

export const getInputStyle = (props: {
  size: Size;
  isDisabled: boolean;
}) => css`
  ${resetDecoration};
  ${resetTypography};
  padding: 0;
  color: ${InputColor.Base};
  background-image: none;
  border: none;
  outline: none;

  &[disabled] {
    cursor: not-allowed;
  }

  ${props.isDisabled ? inputDisabledStyle : null};

  ${getInputSizeStyle(props)};
`;

export const getInputSpanStyle = (props: { isHidden?: boolean } = {}) => css`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  visibility: ${props.isHidden ? 'hidden' : 'visible'};
`;

export const getInputWrapperSizeStyle = ({ size }: { size: Size }) => {
  switch (size) {
    case 'small':
      return css`
        height: ${StyleSize.Small};
        font-size: ${FontSize.Base};
      `;
    case 'large':
      return css`
        height: ${StyleSize.Large};
        font-size: ${FontSize.Medium};
      `;
    default:
    case 'normal':
      return css`
        height: ${StyleSize.Normal};
        font-size: ${FontSize.Base};
      `;
  }
};

export const getInputWrapperStyle = (props: {
  isFocus?: boolean;
  isDisabled?: boolean;
  size: Size;
}) => css`
  display: inline-flex;
  align-items: center;

  ${resetBox};
  ${resetTypography};
  ${getInputWrapperSizeStyle({
    size: props.size,
  })};

  padding: 0 12px;
  border: 1px solid ${BorderColor.Base};
  border-radius: 2px;
  background-color: ${BaseColor.White};
  outline: none;
  transition: all 0.3s;

  &:hover {
    border-color: ${Color.Primary};
  }

  ${props.isFocus
    ? css`
        border-color: ${generate(Color.Primary)[4]};
        outline: 0;
        box-shadow: 0 0 0 2px ${transparentize(0.8, Color.Primary)};
      `
    : null};

  ${props.isDisabled
    ? css`
        color: ${Color.Disabled};
        background-color: ${BackgroundColor.Base};
        cursor: not-allowed;
        opacity: 1;

        &:hover {
          border-color: ${BorderColor.Base};
        }
      `
    : null};
`;

export const iconStyle = css`
  color: ${Color.Disabled};
  font-size: ${FontSize.Medium};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${TextColor.Secondary};
  }

  &:active {
    color: ${TextColor.Base};
  }
`;

export const prefixStyle = css`
  margin-right: 4px;
`;

export const suffixStyle = css`
  margin-left: 4px;
`;
