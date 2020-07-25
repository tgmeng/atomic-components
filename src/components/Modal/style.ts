import styled from '@emotion/styled';
import { position, size } from 'polished';

import { BaseColor } from '../../styles';

export const ModalWrapper = styled('div')`
  box-sizing: border-box;
  position: fixed;
  top: 0%;
  left: 0%;
  ${size('100%')};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
`;

export const Backdrop = styled('div')`
  ${position('absolute', 0)};
  display: block;
  ${size('100%')};
  background-color: rgba(0, 0, 0, 0.45);
  outline: none;
`;

export const Modal = styled('div')`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  background: ${BaseColor.White};
  position: relative;
  background-clip: padding-box;
  border: 0;
  outline: 0;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
`;
