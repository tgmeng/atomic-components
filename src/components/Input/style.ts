import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { fade, transparentize } from 'polished';

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
} from '../../styles';

import { Size } from './type';

export const StyleVariable = {
  InputColor: TextColor,
};

export const Input = styled('input')`
  ${resetTypography};
  padding: 0;
  color: ${StyleVariable.InputColor};
  background-image: none;
  border: none;
  outline: none;
  
  &[disabled] {
    cursor: not-allowed;
  }
`;

export const getSizeStyle = ({ size }: { size?: Size }) => {
  switch (size) {
    case 'small':
      return css`
        height: ${StyleSize.Small};
        font-size: ${FontSize.Base};

        ${Input} {
          font-size: ${FontSize.Base};
        }
      `;
    case 'large':
      return css`
        height: ${StyleSize.Large};
        font-size: ${FontSize.Medium};
        ${Input} {
          font-size: ${FontSize.Medium};
        }
      `;
    default:
    case 'normal':
      return css`
        height: ${StyleSize.Normal};
        font-size: ${FontSize.Base};
        ${Input} {
          font-size: ${FontSize.Base};
        }
      `;
  }
};

export const InputSpan = styled('span')<{ isHidden?: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
`;

export const InputWrapper = styled('span')<{
  isFocus?: boolean;
  isDisabled?: boolean;
  size: Size;
}>`
  display: inline-flex;
  align-items: center;

  ${resetBox};
  ${resetTypography};
  ${getSizeStyle};

  padding: 0 12px;
  border: 1px solid ${BorderColor.Base};
  border-radius: 2px;
  background-color: ${BaseColor.White};
  transition: all 0.3s;

  &:hover {
    border-color: ${Color.Primary};
  }

  ${(props) =>
    props.isFocus &&
    css`
      border-color: ${generate(Color.Primary)[4]};
      outline: 0;
      box-shadow: 0 0 0 2px ${transparentize(0.8, Color.Primary)};
    `};

  ${(props) =>
    props.isDisabled &&
    css`
      color: ${Color.Disabled};
      background-color: ${BackgroundColor.Base};
      cursor: not-allowed;
      opacity: 1;

      ${Input} {
        color: ${Color.Disabled};
      }

      &:hover {
        border-color: ${BorderColor.Base};
      }
    `};
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
