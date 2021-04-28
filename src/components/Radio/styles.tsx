import { css } from '@emotion/css';

import { size, position } from 'polished';
import { refStyle } from '../../utils/style';

import { RadioButtonSize, RadioButtonVariant } from './types';

/**
 * Common
 */

export const radioGroupStyle = css`
  font-size: 0;
`;

export const radioInputStyle = css`
  display: none;
`;

export const radioWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  white-space: nowrap;
`;

/**
 * Radio
 */

export const radioWrapperStyle = css`
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  white-space: nowrap;
`;

export const radioDotStyle = css`
  position: relative;
  display: block;
  ${size('16px')};
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
  }

  &:after {
    ${position('absolute', 0)};
    display: block;
    ${size('8px')};
    margin: auto;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    content: ' ';
  }
`;

export const radioTextStyle = css`
  padding-right: 8px;
  padding-left: 8px;
`;

export const radioInteractiveStyle = css`
  cursor: pointer;

  ${refStyle(radioInputStyle)}:checked ~ ${refStyle(radioDotStyle)}:after {
    background-color: #1890ff;
  }

  ${refStyle(radioInputStyle)}:disabled ~ ${refStyle(radioDotStyle)} {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }

  ${refStyle(radioInputStyle)}:checked:disabled ~ ${refStyle(
  radioDotStyle
)}:after {
    background-color: rgba(0,0,0,.2);
  }

  ${refStyle(radioInputStyle)}:disabled ~ ${refStyle(radioTextStyle)} {
    color: rgba(0,0,0,.25);
    cursor: not-allowed;
  }
`;

/**
 * RadioButton
 */

export const getRadioButtonSizeStyle = ({
  size: _size,
}: {
  size?: RadioButtonSize;
}) => {
  switch (_size) {
    case 'small':
      return css`
        height: 24px;
        padding: 0 7px;
        font-size: 14px;
        line-height: 22px;
      `;
    case 'large':
      return css`
        height: 40px;
        font-size: 16px;
        line-height: 38px;
      `;
    case 'normal':
    default:
      return css`
        height: 32px;
        font-size: 14px;
        line-height: 30px;
      `;
  }
};

export const radioButtonStyle = css`
  position: relative;
  margin: 0;
  padding: 0 15px;
  line-height: 30px;
  background: #fff;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1.02px 1px 1px 0;
  color: rgba(0, 0, 0, 0.85);
  white-space: nowrap;
  transition: color 0.3s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    color: #1890ff;
  }
`;

export const getRadioButtonWrapperStyle = ({
  variant,
}: {
  variant?: RadioButtonVariant;
}) => {
  const baseStyle = css`
    &:first-of-type ${refStyle(radioButtonStyle)} {
      border-left: 1px solid #d9d9d9;
      border-radius: 2px 0 0 2px;
    }

    &:not(:first-of-type) ${refStyle(radioButtonStyle)}:before {
      display: block;
      position: absolute;
      top: -1px;
      bottom: -1px;
      left: -1px;
      width: 1px;
      background-color: #d9d9d9;
      content: '';
    }

    &:last-of-type ${refStyle(radioButtonStyle)} {
      border-radius: 0 2px 2px 0;
    }

    /** for radioButtonStyle */
    ${refStyle(radioButtonStyle)}:before {
      z-index: -1;
    }

    ${refStyle(radioInputStyle)}:disabled ~ ${refStyle(radioButtonStyle)} {
      color: rgba(0,0,0,.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
    }

    ${refStyle(radioInputStyle)}:checked:disabled ~ ${refStyle(
    radioButtonStyle
  )} {
      background-color: #e6e6e6;
    }
  `;

  let variantStyle;
  switch (variant) {
    case 'solid':
      variantStyle = css`
        ${refStyle(radioInputStyle)}:checked ~ ${refStyle(radioButtonStyle)} {
          color: #fff;
          border-color: #1890ff;
          background-color: #1890ff;

          &:before {
            z-index: 1;
            background-color: #1890ff;
          }
        }
      `;
      break;
    case 'default':
    default:
      variantStyle = css`
        ${refStyle(radioInputStyle)}:checked ~ ${refStyle(radioButtonStyle)} {
          color: #1890ff;
          border-color: #1890ff;

          &:before {
            z-index: 1;
            background-color: #1890ff;
          }
        }
      `;
      break;
  }

  return css`
    ${baseStyle};
    ${variantStyle};
  `;
};
