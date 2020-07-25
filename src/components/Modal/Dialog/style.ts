import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ellipsis } from 'polished';

import {
  flexGrowStyle,
  flexShrinkStyle,
  resetDecoration,
  resetBox,
} from '../../../styles';

export const dialogStyle = css`
  width: 520px;
`;

export const Header = styled('div')`
  display: flex;
  /* align-items: stretch; */
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const titleStyle = css`
  ${flexGrowStyle};
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  ${ellipsis()}
`;

export const CloseButton = styled('button')`
  ${flexShrinkStyle};
  width: 56px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  text-align: center;
  ${resetBox};
  ${resetDecoration};
  cursor: pointer;
  transition: color 0.3s;

  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
`;

export const Content = styled('div')`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
`;

export const Actions = styled('div')`
  padding: 10px 16px;
  text-align: right;
  background: 0 0;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;

  > * + * {
    margin-left: 8px;
  }
`;
