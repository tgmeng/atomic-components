import styled from '@emotion/styled';
import { BaseColor } from '../../styles';

export const Overlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
`;

export const ModalWrapper = styled('div')`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: all 0.3s; 
`;

export const Modal = styled('div')`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  background: ${BaseColor.White};
  pointer-events: all;
`;
