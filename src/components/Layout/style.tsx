import { css } from '@emotion/css';

import { AsProps } from '../../types';

export const headerStyle = css`
  flex: 0 0 auto;
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
`;

export const contentStyle = css`
  flex: auto;
  min-height: 0;
`;

export const asideStyle = css`
  position: relative;
  /* fix firefox can't set width smaller than content on flex item */
  min-width: 0;
  transition: all 0.2s;
`;

export const footerStyle = css`
  flex: 0 0 auto;
  padding: 24px 50px;
`;

export const getLayoutStyle = (
  props: AsProps & {
    hasAside: boolean;
  }
) =>
  css`
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

    ${props.hasAside
      ? css`
          flex-direction: row;
        `
      : null}
  `;
