import { css as vanillaCss } from 'emotion';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { ColorByIntent } from '../../styles';

import { Intent } from './type';

const zIndex = 5000;

export const messageContainerVanillaStyle = vanillaCss`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${zIndex};
  pointer-events: none;
`;

export const messageWrapperStyle = css`
  margin-top: 10px;
  text-align: center;
`;

export const Message = styled('div')`
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: all;
`;

export const getIconStyle = ({ intent = 'info' }: { intent: Intent }) => css`
  margin-right: 8px;
  color: ${ColorByIntent[intent]};
`;
