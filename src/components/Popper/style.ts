import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Content = styled('div')`
  box-sizing: border-box;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export function getArrowStyle(
  direction: 'top' | 'right' | 'bottom' | 'left',
  color: string
) {
  switch (direction) {
    case 'top':
      return css`
        border-top-color: ${color};
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: ${color};
      `;
    case 'right':
      return css`
        border-top-color: ${color};
        border-right-color: ${color};
        border-bottom-color: transparent;
        border-left-color: transparent;
      `;
    case 'bottom':
      return css`
        border-top-color: transparent;
        border-right-color: ${color};
        border-bottom-color: ${color};
        border-left-color: transparent;
      `;
    case 'left':
      return css`
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: ${color};
        border-left-color: ${color};
      `;
    default:
      return null;
  }
}

export const Arrow = styled('div')`
  &:after {
    display: block;
    background: 0 0;
    border-style: solid;
    border-width: 4.24264069px;
    transform: rotate(45deg);
    content: '';
  }

  ${Content}[data-popper-placement^='top'] & {
    bottom: -4px;
  }
  ${Content}[data-popper-placement^='top'] &:after {
    ${getArrowStyle('bottom', '#fff')}
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
  }

  ${Content}[data-popper-placement^='bottom'] & {
    top: -4px;
  }
  ${Content}[data-popper-placement^='bottom'] &:after {
    ${getArrowStyle('top', '#fff')}
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
  }

  ${Content}[data-popper-placement^='left'] & {
    right: -4px;
  }
  ${Content}[data-popper-placement^='left'] &:after {
    ${getArrowStyle('right', '#fff')}
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
  }

  ${Content}[data-popper-placement^='right'] & {
    left: -4px;
  }
  ${Content}[data-popper-placement^='right'] &:after {
    ${getArrowStyle('left', '#fff')}
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
  }
`;
