import { css } from '@emotion/css';
import { refStyle } from '../../../utils/style';
import { getArrowStyle } from '../styles';

export const contentStyle = css`
  min-width: 30px;
  min-height: 32px;
  padding: 6px 8px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`;

export const arrowStyle = css`
  ${refStyle(contentStyle)}[data-popper-placement^='top'] &:after {
    ${getArrowStyle('bottom', 'rgba(0,0,0,.75)')};
  }

  ${refStyle(contentStyle)}[data-popper-placement^='right'] &:after {
    ${getArrowStyle('left', 'rgba(0,0,0,.75)')};
  }

  ${refStyle(contentStyle)}[data-popper-placement^='bottom'] &:after {
    ${getArrowStyle('top', 'rgba(0,0,0,.75)')};
  }

  ${refStyle(contentStyle)}[data-popper-placement^='left'] &:after {
    ${getArrowStyle('right', 'rgba(0,0,0,.75)')};
  }
`;
