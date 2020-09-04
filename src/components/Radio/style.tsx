import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { size, position } from 'polished';

export const radioWrapperStyle = css`
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  white-space: nowrap;
`;

export const RadioInput = styled.input`
  display: none;
`;

export const RadioDot = styled.span`
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

export const RadioText = styled.span`
  padding-right: 8px;
  padding-left: 8px;
`;

export const radioInteractiveStyle = css`
  ${RadioInput}:checked ~ ${RadioDot}:after {
    background-color: #1890ff;
  }

  ${RadioInput}:disabled ~ ${RadioDot} {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }

  ${RadioInput}:checked:disabled ~ ${RadioDot}:after {
    background-color: rgba(0,0,0,.2);
  }

  ${RadioInput}:disabled ~ ${RadioText} {
    color: rgba(0,0,0,.25);
    cursor: not-allowed;
  }
`;
