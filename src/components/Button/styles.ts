import { css, keyframes } from '@emotion/css';
import { position } from 'polished';

import { generate } from '@ant-design/colors';

import { changePXRelatively, refStyle } from '../../utils/style';
import {
  Color,
  FontSize,
  Size as StyleSize,
  BaseColor,
  BackgroundColor,
  BorderColor,
  TextColor,
  ColorByIntent,
} from '../../styles';

import { ButtonProps, Size } from './types';

/**
 * 基础样式
 */

export const baseStyle = css`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 2px;
  text-align: center;
  outline: none;
  white-space: nowrap;
  transition: all 0.3s;
  touch-action: manipulation;
  user-select: none;
  cursor: pointer;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const iconStyle = css`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  line-height: 1;
`;

export const loadingIconStyle = css`
  animation: ${spin} 1s linear infinite;
`;

export const loadingStyle = css`
  position: relative;
  pointer-events: none;

  &:before {
    ${position('absolute', -1)};
    z-index: 1;
    background: ${BaseColor.White};
    border-radius: inherit;
    opacity: 0.35;
    transition: opacity 0.2s;
    content: '';
  }
`;

/**
 * 大小样式
 */

export const getSizeStyle = ({ size = 'normal' }: { size?: Size }) => {
  switch (size) {
    case 'small':
      return css`
        height: ${StyleSize.Small};
        padding: 0 7px;
        line-height: ${changePXRelatively(StyleSize.Small, -2)};
        font-size: ${FontSize.Base};
      `;
    case 'large':
      return css`
        height: ${StyleSize.Large};
        padding: 0 15px;
        line-height: ${changePXRelatively(StyleSize.Large, -2)};
        font-size: ${FontSize.Medium};
      `;
    default:
    case 'normal':
      return css`
        height: ${StyleSize.Normal};
        padding: 0 15px;
        line-height: ${changePXRelatively(StyleSize.Normal, -2)};
        font-size: ${FontSize.Base};
      `;
  }
};

/**
 * 变体样式
 */

export type ButtonColorObject = Partial<{
  color: string;
  backgroundColor: string;
  borderColor: string;
}>;

export const getButtonColor = ({
  color = 'transparent',
  backgroundColor = 'transparent',
  borderColor = 'transparent',
}: ButtonColorObject) => css`
  color: ${color};
  background: ${backgroundColor};
  border-color: ${borderColor};
`;

const getBaseNormalButtonStyle = ({
  borderStyle = 'solid',
  color = TextColor.Base,
}: ButtonColorObject & {
  borderStyle: string;
}) => css`
  border-style: ${borderStyle};

  &:hover,
  &:focus {
    ${getButtonColor({
      color: generate(color)[4],
      borderColor: generate(color)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color: generate(color)[6],
      borderColor: generate(color)[6],
    })};
  }
`;

const getNormalButtonStyle = ({
  color = TextColor.Base,
  borderStyle = 'solid',
}: ButtonColorObject &
  Partial<{
    borderStyle: string;
  }>) => css`
  ${getButtonColor({
    color,
    borderColor: color,
  })};
  ${getBaseNormalButtonStyle({
    color,
    borderStyle,
  })}
`;

const getInfoNormalButtonStyle = ({
  color = TextColor.Base,
  borderStyle = 'solid',
}: ButtonColorObject &
  Partial<{
    borderStyle: string;
  }>) => css`
  ${getButtonColor({
    color: TextColor.Base,
    borderColor: BorderColor.Base,
  })};
  ${getBaseNormalButtonStyle({
    color,
    borderStyle,
  })}
`;

const getPrimaryButtonStyle = ({
  color = BaseColor.White,
  backgroundColor = BaseColor.Black,
}: Pick<ButtonColorObject, 'color' | 'backgroundColor'>) => css`
  ${getButtonColor({
    color,
    backgroundColor,
    borderColor: backgroundColor,
  })};

  &:hover,
  &:focus {
    ${getButtonColor({
      color,
      backgroundColor: generate(backgroundColor)[4],
      borderColor: generate(backgroundColor)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color,
      backgroundColor: generate(backgroundColor)[6],
      borderColor: generate(backgroundColor)[6],
    })};
  }
`;

const getBaseLinkButtonStyle = ({ color = TextColor.Base }) => css`
  &:hover,
  &:focus {
    ${getButtonColor({
      color: generate(color)[4],
    })};
  }

  &:active {
    ${getButtonColor({
      color: generate(color)[6],
    })};
  }
`;

const getInfoLinkButtonStyle = ({
  color = TextColor.Base,
}: ButtonColorObject) => css`
  ${getButtonColor({
    color: TextColor.Base,
  })};
  ${getBaseLinkButtonStyle({
    color,
  })}
`;

const getLinkButtonStyle = ({
  color = TextColor.Base,
}: ButtonColorObject) => css`
  ${getButtonColor({
    color,
  })};
  ${getBaseLinkButtonStyle({
    color,
  })}
`;

export const getVariantStyle = (props: ButtonProps) => {
  const { variant = 'default', intent = 'info' } = props;
  const color = ColorByIntent[intent];

  let variantStyle = null;

  switch (variant) {
    case 'primary':
      variantStyle = getPrimaryButtonStyle({
        color: BaseColor.White,
        backgroundColor: color,
      });
      break;

    case 'dashed':
      variantStyle =
        intent === 'info'
          ? getInfoNormalButtonStyle({
              color,
              borderStyle: 'dashed',
            })
          : getNormalButtonStyle({
              color,
              borderStyle: 'dashed',
            });
      break;

    case 'link':
      variantStyle =
        intent === 'info'
          ? getInfoLinkButtonStyle({
              color,
            })
          : getLinkButtonStyle({
              color,
            });
      break;

    case 'default':
    default:
      variantStyle =
        intent === 'info'
          ? getInfoNormalButtonStyle({
              color,
              borderStyle: 'solid',
            })
          : getNormalButtonStyle({
              color,
              borderStyle: 'solid',
            });
      break;
  }

  return variantStyle;
};

/**
 * 禁用样式
 */

export const getBaseDisabledStyle = ({
  color = Color.Disabled,
  borderColor = BorderColor.Base,
  backgroundColor = BackgroundColor.Base,
}: ButtonColorObject = {}) =>
  css`
    &,
    &:hover,
    &:focus,
    &:active {
      ${getButtonColor({
        color,
        borderColor,
        backgroundColor,
      })};
      cursor: not-allowed;
      text-shadow: none;
      box-shadow: none;
    }
  `;

export const getDisabledStyle = (props: ButtonProps) =>
  getBaseDisabledStyle(
    props.variant === 'link'
      ? {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        }
      : {}
  );

/**
 * ButtonGroup
 */

export const buttonGroupItemStyle = css`
  border-radius: 0;
`;

export const buttonGroupStyle = css`
  display: inline-flex;
  align-items: top;

  & > ${refStyle(buttonGroupItemStyle)} {
    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }

    &:not(:last-child) {
      &:after {
        z-index: 1;
        position: absolute;
        right: -1px;
        top: -1px;
        bottom: -1px;
        border-right: 1px solid transparent;
        transition: all 0.3s;
        content: '';
      }

      &:hover:after {
        border-right-color: ${Color.Primary};
      }
    }
  }

  & > ${refStyle(buttonGroupItemStyle)}+${refStyle(buttonGroupItemStyle)} {
    margin-left: -1px;
  }
`;
