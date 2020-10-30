import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { AsProps } from '../../types';

export const Header = styled.header<AsProps>`
  flex: 0 0 auto;
`;

export const Content = styled.main<AsProps>`
  flex: auto;
  min-height: 0;
`;

export const Aside = styled.aside<AsProps>`
  position: relative;
  /* fix firefox can't set width smaller than content on flex item */
  min-width: 0;
  transition: all 0.2s;
`;

export const Footer = styled.footer<AsProps>`
  flex: 0 0 auto;
`;

export const Layout = styled.section<
  AsProps & {
    hasAside: boolean;
  }
>`
  display: flex;
  flex: auto;
  flex-direction: column;
  /* fix firefox can't set height smaller than content on flex item */
  min-height: 0;
  background: #eee;

  &,
  > * {
    box-sizing: border-box;
  }

  ${(props) =>
    props.hasAside
      ? css`
          flex-direction: row;
        `
      : null}
`;
